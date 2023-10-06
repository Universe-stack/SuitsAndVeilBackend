import mongoose, { Schema, Document } from 'mongoose';

export interface IGuest extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isAttending: boolean;
  dietaryRestrictions: string[];
  // Add other fields as needed
}

const guestSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  isAttending: { type: Boolean, default: false }, // Default value is false
  dietaryRestrictions: [{ type: String }],
  // Define other fields as needed
});

export default mongoose.model<IGuest>('Guest', guestSchema);
