const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const CALENDLY_USERNAME = process.env.CALENDLY_USERNAME;

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, date, time, phone, message } = body;

    if (!name || !email || !date || !time) {
      return {
        statusCode: 400,
        headers: { 'Cache-Control': 'no-store' },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const calendlyURL = `https://calendly.com/${CALENDLY_USERNAME}/30min`;

    const data = await resend.emails.send({
      from: 'Neqo360 Website <onboarding@resend.dev>',
      to: [email],
      bcc: ['neqo360@gmail.com'],
      subject: 'Meeting Scheduled - Neqo360',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1; margin-bottom: 24px;">Meeting Confirmation</h2>
          
          <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
            <h3 style="color: #334155; margin: 0 0 16px 0;">Meeting Details</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> 30 minutes</p>
          </div>
          
          <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
            <h3 style="color: #334155; margin: 0 0 16px 0;">Your Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>

          <div style="margin-top: 24px;">
            <p>Your meeting has been scheduled successfully. You will receive a calendar invitation shortly.</p>
            <p>Meeting link: <a href="${calendlyURL}" style="color: #6366f1;">${calendlyURL}</a></p>
          </div>
          
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              If you need to reschedule or cancel, please use the links in your calendar invitation.
            </p>
          </div>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: { 'Cache-Control': 'no-store' },
      body: JSON.stringify({ 
        message: 'Meeting scheduled successfully! Check your email for confirmation.',
        data 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Failed to schedule meeting' })
    };
  }
};
