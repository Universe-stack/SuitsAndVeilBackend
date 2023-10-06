import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  weddingDate: Date;
  budget: number;
  // Add other fields as needed
}

const clientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  weddingDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  // Define other fields as needed
});

export default mongoose.model<IClient>('Client', clientSchema);
