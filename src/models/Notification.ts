import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId; // Reference to the user receiving the notification
  content: string;
  isRead: boolean;
  createdAt: Date;
  // Add other fields as needed
}

const notificationSchema: Schema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a User
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false }, // Default value is false
  createdAt: { type: Date, default: Date.now },
  // Define other fields as needed
});

export default mongoose.model<INotification>('Notification', notificationSchema);
