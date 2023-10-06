import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  deadline: Date;
  assignedTo: mongoose.Types.ObjectId; // Reference to the user assigned to the task
  isCompleted: boolean;
  // Add other fields as needed
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a User
  isCompleted: { type: Boolean, default: false }, // Default value is false
  // Define other fields as needed
});

export default mongoose.model<ITask>('Task', taskSchema);
