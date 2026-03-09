const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendWaitlistConfirmationEmail = async (userEmail) => {
    try {
        const mailOptions = {
            from: `"Wattwise Notifications" <${process.env.SMTP_USER}>`,
            to: userEmail,
            subject: 'You have secured your spot on the Wattwise Waitlist',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Wattwise</title>
                <style>
                    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
                    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
                    .header { background-color: #0f172a; padding: 40px 30px; text-align: center; }
                    .header h1 { color: #10b981; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
                    .content { padding: 40px 30px; color: #334155; line-height: 1.7; font-size: 16px; }
                    .content h2 { color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 600; }
                    .content p { margin: 0 0 20px; }
                    .highlight-box { background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; border-radius: 0 8px 8px 0; margin: 30px 0; }
                    .highlight-box p { margin: 0; color: #065f46; font-weight: 500; }
                    .footer { text-align: center; padding: 30px; background-color: #f1f5f9; color: #64748b; font-size: 14px; }
                    .footer a { color: #10b981; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Wattwise</h1>
                    </div>
                    <div class="content">
                        <h2>Hello there,</h2>
                        <p>This is a quick confirmation that we have successfully received your request, and your spot on the Wattwise waitlist is officially secured.</p>
                        <p>We're rigorously building an intelligent, AI-powered platform designed to provide unprecedented insights into your energy consumption, allowing you to monitor, manage, and optimize your power seamlessly.</p>
                        
                        <div class="highlight-box">
                            <p>You are now in line for early access. We will notify you the moment we open up more spots or officially launch.</p>
                        </div>
                        
                        <p>If you have any questions in the meantime, feel free to reply to this email.</p>
                        <p>Thank you for your early support.</p>
                        <p>Best regards,<br><strong>The Wattwise Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Wattwise. All rights reserved.</p>
                        <p>This email was sent to ${userEmail}. If you didn't request this, you can ignore this email.</p>
                    </div>
                </div>
            </body>
            </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Authentic waitlist email sent to:', userEmail, 'Message ID:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending waitlist email to:', userEmail, error);
        return null;
    }
};

module.exports = {
    sendWaitlistConfirmationEmail,
};
