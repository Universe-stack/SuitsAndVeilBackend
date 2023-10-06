import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  client: mongoose.Types.ObjectId; // Reference to the client making the payment
  vendor: mongoose.Types.ObjectId; // Reference to the vendor receiving the payment
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  // Add other fields as needed
}

const paymentSchema: Schema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true }, // Reference to a Client
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Reference to a Vendor
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  // Define other fields as needed
});

export default mongoose.model<IPayment>('Payment', paymentSchema);
