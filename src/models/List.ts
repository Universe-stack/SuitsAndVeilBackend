import mongoose, { Schema, Document } from 'mongoose';

export interface IList extends Document {
  name: string;
  items: string[]; // An array of items in the list
  collaborators: mongoose.Types.ObjectId[]; // An array of collaborators' references (User model)
  amount: number;
  createdBy: mongoose.Types.ObjectId; // Reference to the user who created the list
  createdAt: Date;
  // Add other fields as needed
}

const listSchema: Schema = new Schema({
  name: { type: String, required: true },
  items: [{ type: String }], // An array of items (strings) in the list
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }], // An array of User references
  amount: { type: Number, default: 0 }, // Default value is 0
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a User
  createdAt: { type: Date, default: Date.now },
  // Define other fields as needed
});

export default mongoose.model<IList>('List', listSchema);
