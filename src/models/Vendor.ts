import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  category: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  services: string[]; // An array of services provided by the vendor
  rating: number;
  // Add other fields as needed
}

const vendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  website: { type: String },
  services: [{ type: String }], // An array of services provided by the vendor
  rating: { type: Number, default: 0 }, // Default rating value, you can adjust as needed
  // Define other fields as needed
});

export default mongoose.model<IVendor>('Vendor', vendorSchema);
