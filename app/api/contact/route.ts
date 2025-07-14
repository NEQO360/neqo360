import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { apiContactSchema } from '../../lib/validation/schemas';
import { rateLimit } from '../../lib/utils/rateLimit';
import { sanitizeText } from '../../lib/utils/security';
import { env, validateEnv } from '../../lib/config/env';
import { validateCSRFToken } from '../../lib/utils/csrf';
import { logger } from '../../lib/utils/logger';

// Validate environment variables
validateEnv();

const resend = new Resend(env.RESEND_API_KEY);

// Using sanitizeText from security utils instead of local function

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(ip, env.RATE_LIMIT_MAX_REQUESTS, env.RATE_LIMIT_WINDOW_MS);
    
    if (!rateLimitResult.success) {
      logger.warn('Rate limit exceeded', { ip, remaining: rateLimitResult.remaining });
      const response = NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetTime: new Date(rateLimitResult.resetTime).toISOString()
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      );
      
      logger.logRequest(request, response, Date.now() - startTime);
      return response;
    }

    const body = await request.json();
    
    // Validate CSRF token
    const csrfToken = request.headers.get('x-csrf-token');
    if (!csrfToken || !validateCSRFToken(csrfToken)) {
      logger.warn('CSRF token validation failed', { ip, hasToken: !!csrfToken });
      const response = NextResponse.json(
        { error: 'Invalid or missing CSRF token' },
        { status: 403 }
      );
      
      logger.logRequest(request, response, Date.now() - startTime);
      return response;
    }
    
    // Validate request body with Zod
    const validationResult = apiContactSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn('Validation failed', { 
        ip, 
        errors: validationResult.error.errors,
        body: { name: body.name, email: body.email, projectType: body.projectType }
      });
      const response = NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
      
      logger.logRequest(request, response, Date.now() - startTime);
      return response;
    }

    const { name, email, projectType, message } = validationResult.data;

    const sanitizedName = sanitizeText(name);
    const sanitizedEmail = sanitizeText(email);
    const sanitizedProjectType = sanitizeText(projectType);
    const sanitizedMessage = sanitizeText(message);

    const data = await resend.emails.send({
      from: `Neqo360 Website <${env.FROM_EMAIL}>`,
      to: [env.TO_EMAIL],
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

    logger.info('Email sent successfully', { 
      ip, 
      projectType: sanitizedProjectType,
      email: sanitizedEmail.substring(0, 10) + '***' // Log partial email for privacy
    });
    
    const response = NextResponse.json(
      { message: 'Email sent successfully', data },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': env.NODE_ENV === 'production' 
            ? env.ALLOWED_ORIGINS[0] || 'https://neqo360.com'
            : '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
    
    logger.logRequest(request, response, Date.now() - startTime);
    return response;
  } catch (error) {
    logger.error('Failed to send email', { 
      ip, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    const response = NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
    
    logger.logRequest(request, response, Date.now() - startTime);
    return response;
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': env.NODE_ENV === 'production' 
        ? env.ALLOWED_ORIGINS[0] || 'https://neqo360.com'
        : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 