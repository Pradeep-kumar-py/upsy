import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailVerificationData {
  email: string;
  name: string;
  verificationToken: string;
}

export const sendVerificationEmail = async ({ email, name, verificationToken }: EmailVerificationData) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL || 'https://upsy.in'}/verify-email?token=${verificationToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Upsy <noreply@studymonk.live>',
      to: email,
      subject: 'Verify your email address - Upsy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - Upsy</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 40px 20px; text-align: center; }
            .logo { color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; }
            .content { padding: 40px 20px; }
            .title { color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 20px 0; }
            .text { color: #6b7280; font-size: 16px; line-height: 1.5; margin: 0 0 30px 0; }
            .button { display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; }
            .button:hover { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            .divider { height: 1px; background-color: #e5e7eb; margin: 30px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo">upsy</h1>
            </div>
            <div class="content">
              <h2 class="title">Welcome to Upsy, ${name}!</h2>
              <p class="text">
                Thank you for signing up with Upsy. To complete your registration and start exploring opportunities, please verify your email address by clicking the button below.
              </p>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              <div class="divider"></div>
              <p class="text">
                If the button doesn't work, you can copy and paste this link into your browser:<br>
                <a href="${verificationUrl}" style="color: #f59e0b; word-break: break-all;">${verificationUrl}</a>
              </p>
              <p class="text">
                This verification link will expire in 24 hours for security reasons.
              </p>
            </div>
            <div class="footer">
              <p>© 2025 Upsy. All rights reserved.</p>
              <p>If you didn't create an account with us, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error('Failed to send verification email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error('Failed to send verification email');
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Upsy <noreply@studymonk.live>',
      to: email,
      subject: 'Welcome to Upsy!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Upsy</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 40px 20px; text-align: center; }
            .logo { color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; }
            .content { padding: 40px 20px; }
            .title { color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 20px 0; }
            .text { color: #6b7280; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo">upsy</h1>
            </div>
            <div class="content">
              <h2 class="title">Welcome to Upsy, ${name}!</h2>
              <p class="text">Your email has been successfully verified and your account is now active.</p>
              <p class="text">You can now access all the features and start your journey with Upsy.</p>
              <p class="text">Thank you for choosing Upsy for your financial needs.</p>
            </div>
            <div class="footer">
              <p>© 2025 Upsy. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Welcome email error:', error);
      throw new Error('Failed to send welcome email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Welcome email service error:', error);
    throw new Error('Failed to send welcome email');
  }
};
