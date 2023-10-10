import express, { Request, Response } from 'express';
import Payment, { IPayment } from '../models/Payment';

// Create a Payment
export const createPayment= async (req: Request, res: Response) => {
  try {
    const { client, vendor, amount, paymentDate, paymentMethod } = req.body;

    const newPayment: IPayment = new Payment({
      client,
      vendor,
      amount,
      paymentDate,
      paymentMethod,
    });

    const savedPayment = await newPayment.save();

    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

// Get a Payment by ID
export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payment' });
  }
};

// Update a Payment by ID
export const updatePaymentById=  async (req: Request, res: Response) => {
  try {
    const { client, vendor, amount, paymentDate, paymentMethod } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        client,
        vendor,
        amount,
        paymentDate,
        paymentMethod,
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
};

// Delete a Payment by ID
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete payment' });
  }
};

// Get All Payments
export const getAllPayments= async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find();

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
};
