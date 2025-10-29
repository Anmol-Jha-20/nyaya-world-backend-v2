// Email verification template
exports.emailVerificationTemplate = (name, verificationUrl) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; }
                .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
                <div class="content">
                    <h2>Hello ${name},</h2>
                    <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                    <div style="text-align: center;">
                        <a href="${verificationUrl}" class="button">Verify Email</a>
                    </div>
                    <p>Or copy and paste this link in your browser:</p>
                    <p style="word-break: break-all; color: #4F46E5;">${verificationUrl}</p>
                    <p>This link will expire in 24 hours.</p>
                    <p>If you didn't create an account, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Password reset template
exports.passwordResetTemplate = (name, resetUrl) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #DC2626; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; }
                .button { display: inline-block; padding: 12px 24px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                .warning { background-color: #FEF3C7; padding: 15px; border-left: 4px solid #F59E0B; margin: 15px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <h2>Hello ${name},</h2>
                    <p>You have requested to reset your password. Click the button below to proceed:</p>
                    <div style="text-align: center;">
                        <a href="${resetUrl}" class="button">Reset Password</a>
                    </div>
                    <p>Or copy and paste this link in your browser:</p>
                    <p style="word-break: break-all; color: #DC2626;">${resetUrl}</p>
                    <div class="warning">
                        <strong>⚠️ Security Notice:</strong>
                        <p>This password reset link will expire in 1 hour for your security.</p>
                    </div>
                    <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Password reset success template
exports.passwordResetSuccessTemplate = (name) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #10B981; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                .success { background-color: #D1FAE5; padding: 15px; border-left: 4px solid #10B981; margin: 15px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✓ Password Changed Successfully</h1>
                </div>
                <div class="content">
                    <h2>Hello ${name},</h2>
                    <div class="success">
                        <strong>Success!</strong>
                        <p>Your password has been changed successfully.</p>
                    </div>
                    <p>You can now log in to your account using your new password.</p>
                    <p>If you didn't make this change, please contact our support team immediately.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Nyaya World. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
