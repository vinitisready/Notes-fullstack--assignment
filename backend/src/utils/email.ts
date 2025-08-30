import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOTP = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'HD Notes - Verification OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>HD Notes Verification</h2>
        <p>Your OTP for verification is:</p>
        <h1 style="color: #4285f4; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};