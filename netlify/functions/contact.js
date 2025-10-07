const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitMap = new Map();
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5');
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000');

function rateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      resetTime: Math.min(...validRequests) + RATE_LIMIT_WINDOW_MS
    };
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return {
    success: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - validRequests.length,
    resetTime: now + RATE_LIMIT_WINDOW_MS
  };
}

function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

function validateCSRFToken(token) {
  return token && token.length > 10;
}

const contactSchema = {
  name: (value) => value && typeof value === 'string' && value.length >= 2 && value.length <= 100,
  email: (value) => value && typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  projectType: (value) => value && typeof value === 'string' && value.length >= 2 && value.length <= 50,
  message: (value) => value && typeof value === 'string' && value.length >= 10 && value.length <= 2000
};

function validateContactData(data) {
  const errors = [];
  
  for (const [field, validator] of Object.entries(contactSchema)) {
    if (!validator(data[field])) {
      errors.push({
        field,
        message: `Invalid ${field}`
      });
    }
  }
  
  return errors;
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
          ? (process.env.ALLOWED_ORIGINS?.split(',')[0] || 'https://neqo360.com')
          : '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-csrf-token',
        'Cache-Control': 'no-store',
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const startTime = Date.now();
  const ip = event.headers['x-forwarded-for'] || 
             event.headers['x-real-ip'] || 
             event.headers['client-ip'] ||
             'unknown';
  
  try {
    const rateLimitResult = rateLimit(ip);
    
    if (!rateLimitResult.success) {
      return {
        statusCode: 429,
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          resetTime: new Date(rateLimitResult.resetTime).toISOString()
        })
      };
    }

    const body = JSON.parse(event.body || '{}');
    
    const csrfToken = event.headers['x-csrf-token'];
    if (!csrfToken || !validateCSRFToken(csrfToken)) {
      return {
        statusCode: 403,
        headers: { 'Cache-Control': 'no-store' },
        body: JSON.stringify({ error: 'Invalid or missing CSRF token' })
      };
    }
    
    const validationErrors = validateContactData(body);
    if (validationErrors.length > 0) {
      return {
        statusCode: 400,
        headers: { 'Cache-Control': 'no-store' },
        body: JSON.stringify({ 
          error: 'Validation failed', 
          details: validationErrors 
        })
      };
    }

    const { name, email, projectType, message } = body;

    const sanitizedName = sanitizeText(name);
    const sanitizedEmail = sanitizeText(email);
    const sanitizedProjectType = sanitizeText(projectType);
    const sanitizedMessage = sanitizeText(message);

    const data = await resend.emails.send({
      from: `Neqo360 Website <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [process.env.TO_EMAIL || 'neqo360@gmail.com'],
      subject: `New Contact Form Submission - ${sanitizedProjectType}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1; margin-bottom: 24px;">New Contact Form Submission</h2>
          
          <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
            <h3 style="color: #334155; margin: 0 0 16px 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Project Type:</strong> ${sanitizedProjectType}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 24px; border-radius: 12px;">
            <h3 style="color: #334155; margin: 0 0 16px 0;">Message</h3>
            <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              This email was sent from the Neqo360 website contact form.
            </p>
          </div>
        </div>
      `,
    });

    const responseTime = Date.now() - startTime;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
          ? (process.env.ALLOWED_ORIGINS?.split(',')[0] || 'https://neqo360.com')
          : '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-csrf-token',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ 
        message: 'Email sent successfully', 
        data 
      })
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    return {
      statusCode: 500,
      headers: { 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
