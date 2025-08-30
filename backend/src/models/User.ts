import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  dateOfBirth?: Date;
  googleId?: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  dateOfBirth: { type: Date },
  googleId: { type: String },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date }
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);