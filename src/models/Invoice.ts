import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  vendor: mongoose.Types.ObjectId; // Reference to the vendor issuing the invoice
  client: mongoose.Types.ObjectId; // Reference to the client receiving the invoice
  amount: number;
  dueDate: Date;
  description: string;
  isPaid: boolean;
  // Add other fields as needed
}

const invoiceSchema: Schema = new Schema({
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Reference to a Vendor
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true }, // Reference to a Client
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  description: { type: String, required: true },
  isPaid: { type: Boolean, default: false }, // Default value is false
  // Define other fields as needed
});

export default mongoose.model<IInvoice>('Invoice', invoiceSchema);
