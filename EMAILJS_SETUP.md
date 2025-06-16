# EmailJS Setup Guide

Follow these steps to configure EmailJS for your contact form:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Connect your Gmail account
   - **Outlook**: Connect your Outlook account
   - **Yahoo**: Connect your Yahoo account
4. Follow the authentication process
5. **Copy the Service ID** (you'll need this)

## 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact from PedalADS Website

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from the PedalADS website contact form.
```

4. **Copy the Template ID** (you'll need this)

## 4. Get Your Public Key
1. Go to **Account** > **General**
2. Find your **Public Key**
3. **Copy the Public Key** (you'll need this)

## 5. Update Your Website Code
Replace these placeholders in `js/main.js`:

```javascript
// Line 22: Replace with your actual public key
emailjs.init('YOUR_PUBLIC_KEY');

// Lines 48-49: Replace with your actual IDs
emailjs.send(
    'YOUR_SERVICE_ID',    // Replace with your service ID
    'YOUR_TEMPLATE_ID',   // Replace with your template ID
    templateParams
)
```

## 6. Test Your Form
1. Open your website
2. Fill out the contact form
3. Submit the form
4. Check your email for the message
5. Check browser console for any errors

## Example Configuration
Here's what your configuration might look like:

```javascript
emailjs.init('user_abc123xyz');

emailjs.send(
    'service_gmail_abc123',
    'template_contact_xyz789',
    templateParams
)
```

## Troubleshooting

### Common Issues:
1. **403 Forbidden**: Check your public key is correct
2. **Template not found**: Verify your template ID
3. **Service not found**: Verify your service ID
4. **Emails not arriving**: Check spam folder

### Free Plan Limits:
- **200 emails/month**
- **EmailJS branding** in emails
- **Basic templates**

For higher limits, consider upgrading to a paid plan.

## Email Template Variables Used:
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email
- `{{phone}}` - Visitor's phone (optional)
- `{{message}}` - Visitor's message
- `{{to_email}}` - Your email (pedalads.uk@gmail.com)

## Security Notes:
- Your Public Key can be safely exposed in frontend code
- Service ID and Template ID are also safe to expose
- EmailJS handles the secure email sending
- No sensitive credentials are stored in your website code