import mongoose, { Schema, Document } from 'mongoose';

enum UserRole {
    Admin = 'admin',
    Planner = 'planner',
    Client = 'client',
    Vendor = 'vendor',
    // Add other roles as needed
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole; // admin, planner, client, vendor, etc.
  name: string;
  phone: string;
  address: string;
  profileImage: string; // URL or file path to the profile image
  // Add other fields as needed
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(UserRole) }, // Define roles as needed
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  profileImage: { type: String }, // Store the image URL or path
  // Define other fields as needed
});

export default mongoose.model<IUser>('User', userSchema);
