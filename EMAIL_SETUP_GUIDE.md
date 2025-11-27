# 📧 Contact Form Email Setup Guide

## ✅ What Was Configured

Your contact form is now configured to send emails using **Nodemailer**. Here's what was set up:

### Files Created/Updated:

1. **`src/config/nodemailer.ts`** - Email transporter configuration
2. **`src/server/sendMail.ts`** - Server action for sending emails
3. **`src/components/Contact.tsx`** - Updated to use email functionality
4. **`.env.local.example`** - Environment variables template

## 🚀 Setup Instructions

### Step 1: Install Dependencies (Already Done ✅)

```bash
npm install nodemailer @types/nodemailer
```

### Step 2: Configure Environment Variables

1. Copy the example file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your email credentials

### Step 3: Get Gmail App Password

#### For Gmail Users:

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Click "Generate"
   - Copy the 16-character password (no spaces)

3. **Add to `.env.local`**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop  # Your 16-char app password
   EMAIL_TO=your-email@gmail.com       # Where to receive messages
   ```

### Step 4: Test the Contact Form

1. Start your dev server:

   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000
3. Scroll to the contact section
4. Fill out the form and submit
5. Check your email inbox!

## 📧 Email Template Features

The email you receive includes:

- **Beautiful HTML template** with gradient header
- **Sender's name** and email
- **Message content** in a formatted box
- **Reply-to** automatically set to sender's email
- **Plain text fallback** for email clients that don't support HTML

### Email Preview:

```
┌────────────────────────────────────┐
│   📧 New Contact Form Submission   │
│   (Blue to Purple Gradient)        │
├────────────────────────────────────┤
│                                    │
│ 👤 From: John Doe                  │
│ 📨 Email: john@example.com         │
│ 💬 Message:                        │
│   [Message content here...]        │
│                                    │
├────────────────────────────────────┤
│ This email was sent from your      │
│ portfolio contact form             │
└────────────────────────────────────┘
```

## 🎨 Features Implemented

### Contact Component Updates:

✅ **Loading State** - Button shows "Sending..." while email is being sent
✅ **Disabled State** - Button is disabled during submission
✅ **Success Toast** - Shows success message when email is sent
✅ **Error Handling** - Shows error message if email fails to send
✅ **Form Reset** - Clears the form after successful submission
✅ **Server Action** - Uses Next.js server actions for secure email sending

### Security Features:

✅ **Server-side Only** - Email credentials never exposed to client
✅ **Environment Variables** - Sensitive data stored securely
✅ **Input Validation** - Using Zod schema validation
✅ **Reply-to Header** - Makes it easy to reply to the sender

## 🔧 Alternative Email Services

If you don't want to use Gmail, you can easily switch to other services:

### SendGrid (Recommended for Production)

```typescript
// In src/config/nodemailer.ts
export const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

### Mailgun

```typescript
export const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD,
  },
});
```

### AWS SES

```typescript
export const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASSWORD,
  },
});
```

## 🐛 Troubleshooting

### Issue: "Invalid login" error

**Solution:**

- Make sure you're using an **App Password**, not your regular Gmail password
- Verify 2-Factor Authentication is enabled
- Remove any spaces from the app password

### Issue: Email not sending

**Solution:**

1. Check your environment variables are set correctly
2. Verify the `.env.local` file exists
3. Restart your dev server after adding environment variables
4. Check console for error messages

### Issue: Gmail blocks the email

**Solution:**

- Enable "Less secure app access" (if using regular password)
- Use an App Password instead (recommended)
- Check Gmail security settings

### Issue: Email goes to spam

**Solution:**

- This is normal for development
- In production, use a proper email service (SendGrid, etc.)
- Configure SPF, DKIM, and DMARC records for your domain

## 📝 Environment Variables Reference

```env
# Required
EMAIL_USER=your-email@gmail.com          # Gmail account
EMAIL_PASSWORD=your-16-char-app-password # App password

# Optional
EMAIL_TO=recipient@gmail.com             # Defaults to EMAIL_USER
```

## 🎉 Testing Checklist

- [ ] Environment variables are set in `.env.local`
- [ ] Dev server is restarted after adding environment variables
- [ ] Contact form loads without errors
- [ ] Form validation works (try submitting empty)
- [ ] Submit button shows "Sending..." when clicked
- [ ] Success toast appears after submission
- [ ] Email arrives in your inbox
- [ ] Reply-to email is set correctly
- [ ] Email template looks good

## 📊 What Happens When Form is Submitted

```
1. User fills out form (Name, Email, Message)
   ↓
2. Click "Let's Get Started"
   ↓
3. Form validates using Zod schema
   ↓
4. Button shows "Sending..." and disables
   ↓
5. Server action `sendContactEmail` is called
   ↓
6. Email is sent via Nodemailer
   ↓
7. Success/Error toast is displayed
   ↓
8. Form resets (on success)
   ↓
9. Button re-enables
```

## 🌟 Production Recommendations

For production deployment:

1. **Use a dedicated email service** (SendGrid, AWS SES)
2. **Add rate limiting** to prevent spam
3. **Add reCAPTCHA** for bot protection
4. **Configure proper email authentication** (SPF, DKIM, DMARC)
5. **Monitor email delivery** rates
6. **Set up email notifications** for failed sends

## 📧 Email Service Comparison

| Service  | Free Tier    | Setup Difficulty | Reliability |
| -------- | ------------ | ---------------- | ----------- |
| Gmail    | Yes          | Easy             | Good        |
| SendGrid | 100/day      | Medium           | Excellent   |
| Mailgun  | 5,000/month  | Medium           | Excellent   |
| AWS SES  | 62,000/month | Hard             | Excellent   |

## 🆘 Need Help?

Common issues and solutions:

1. **Emails not sending?** Check your console for error messages
2. **App password not working?** Make sure there are no spaces
3. **Getting authentication errors?** Verify 2FA is enabled
4. **Emails going to spam?** Normal in development, use SendGrid in production

---

**Your contact form is now fully configured and ready to receive messages! 🎉**

Just add your Gmail credentials to `.env.local` and start receiving emails from your portfolio visitors.
