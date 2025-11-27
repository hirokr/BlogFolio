'use server';

import { transporter, emailConfig } from '@/config/nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, message } = data;

    // Email to you (the recipient)
    const mailOptions = {
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #9333ea 100%);
                padding: 30px;
                text-align: center;
                color: white;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 30px;
              }
              .field {
                margin-bottom: 20px;
              }
              .field-label {
                font-weight: bold;
                color: #3b82f6;
                margin-bottom: 5px;
                display: block;
              }
              .field-value {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid #8b5cf6;
              }
              .message-box {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 5px;
                border-left: 4px solid #8b5cf6;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="field-label">👤 From:</span>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <span class="field-label">📨 Email:</span>
                  <div class="field-value">
                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">
                      ${email}
                    </a>
                  </div>
                </div>
                <div class="field">
                  <span class="field-label">💬 Message:</span>
                  <div class="message-box">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from your portfolio contact form</p>
                <p>Reply directly to this email to respond to ${name}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
