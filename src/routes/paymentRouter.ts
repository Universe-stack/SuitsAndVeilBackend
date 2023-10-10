import express, { Request, Response } from 'express';
import Payment, { IPayment } from '../models/Payment';
import {createPayment, getPaymentById,updatePaymentById,deletePayment, getAllPayments} from "../controllers/Payment"

const paymentRouter = express.Router();

// Create a Payment
paymentRouter.post('/', createPayment);

// Get a Payment by ID
paymentRouter.get('/:id',getPaymentById);

// Update a Payment by ID
paymentRouter.put('/:id',updatePaymentById);

// Delete a Payment by ID
paymentRouter.delete('/:id',deletePayment);

// Get All Payments
paymentRouter.get('/all',getAllPayments);

export default paymentRouter;
