import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
// You can use other services like SendGrid, Mailgun, etc.
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your app password
  },
});

// Verify transporter configuration
export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email transporter is ready');
    return true;
  } catch (error) {
    console.error('❌ Email transporter error:', error);
    return false;
  }
};

// Email template configuration
export const emailConfig = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Where you want to receive emails
};
