import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId; // Reference to the user sending the message
  recipient: mongoose.Types.ObjectId; // Reference to the user receiving the message
  content: string;
  timestamp: Date;
  // Add other fields as needed
}

const messageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a User (sender)
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a User (recipient)
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Define other fields as needed
});

export default mongoose.model<IMessage>('Message', messageSchema);
