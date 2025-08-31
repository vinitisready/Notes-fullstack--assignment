import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOTP = async (email: string, otp: string) => {
  try {
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

    console.log(`Sending OTP ${otp} to ${email} (Demo mode - email not actually sent)`);
    return Promise.resolve();
  } catch (error) {
    console.error('Email error:', error);
    return Promise.resolve();
  }
};