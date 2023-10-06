import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  rating: number;
  comment: string;
  reviewedBy: mongoose.Types.ObjectId; // Reference to the user who wrote the review
  vendorId: mongoose.Types.ObjectId; // Reference to the vendor being reviewed
  createdAt: Date;
  // Add other fields as needed
}

const reviewSchema: Schema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a User
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Reference to a Vendor
  createdAt: { type: Date, default: Date.now },
  // Define other fields as needed
});

export default mongoose.model<IReview>('Review', reviewSchema);
