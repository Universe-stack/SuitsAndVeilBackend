import mongoose, { Schema, Document } from 'mongoose';

export interface IWedding extends Document {
  _id:mongoose.Types.ObjectId;
  brideName: string;
  groomName: string;
  weddingDate: Date;
  location: string;
  guestCount: number;
  budget: number;
  planner: mongoose.Types.ObjectId[]; // Reference to the planner who manages the wedding
  vendors: mongoose.Types.ObjectId[]; // Array of vendor references involved in the wedding
  // Add other fields as needed
}

const weddingSchema: Schema = new Schema({
  brideName: { type: String, required: true },
  groomName: { type: String, required: true },
  weddingDate: { type: Date},
  location: { type: String, required: true },
  guestCount: { type: Number, required: true },
  budget: { type: Number, required: true },
  planner: [{ type: Schema.Types.ObjectId, ref: 'User'}], // Reference to a User (planner)
  vendors: [{ type: Schema.Types.ObjectId, ref: 'Vendor' }] // Array of Vendor references
  // Define other fields as needed
});

export default mongoose.model<IWedding>('Wedding', weddingSchema);
