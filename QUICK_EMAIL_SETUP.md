# 📧 Quick Setup - Contact Form Email

## ⚡ Fast Setup (3 Steps)

### 1️⃣ Get Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Enable 2FA if asked
3. Generate password for "Mail"
4. Copy the 16-character code

### 2️⃣ Create `.env.local` file

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_TO=your-email@gmail.com
```

### 3️⃣ Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## ✅ That's It!

Visit http://localhost:3000, scroll to contact form, and test it!

---

## 📋 Files Modified

- ✅ `src/config/nodemailer.ts` - Email config
- ✅ `src/server/sendMail.ts` - Send email function
- ✅ `src/components/Contact.tsx` - Form with email
- ✅ `.env.local.example` - Template

## 🎨 Features Added

- Loading state ("Sending..." button)
- Success/Error toasts
- Form reset after send
- Beautiful HTML email template
- Blue-purple gradient theme

## 📧 Email You'll Receive

```
From: Contact Form <your-email@gmail.com>
Reply-To: visitor@email.com
Subject: New Contact Form Message from [Name]

[Beautiful HTML email with visitor's message]
```

## 🐛 Quick Troubleshooting

**Email not sending?**

- Check `.env.local` exists
- Restart dev server
- Check console for errors

**Invalid login?**

- Use App Password, not regular password
- Enable 2FA first
- Remove spaces from password

**Want different service?**

- Check `EMAIL_SETUP_GUIDE.md` for SendGrid, Mailgun, AWS SES

---

**📖 Full Guide:** See `EMAIL_SETUP_GUIDE.md` for detailed instructions
