"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayments = exports.deletePayment = exports.updatePaymentById = exports.getPaymentById = exports.createPayment = void 0;
const Payment_1 = __importDefault(require("../models/Payment"));
// Create a Payment
const createPayment = async (req, res) => {
    try {
        const { client, vendor, amount, paymentDate, paymentMethod } = req.body;
        const newPayment = new Payment_1.default({
            client,
            vendor,
            amount,
            paymentDate,
            paymentMethod,
        });
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create payment' });
    }
};
exports.createPayment = createPayment;
// Get a Payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment_1.default.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(payment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve payment' });
    }
};
exports.getPaymentById = getPaymentById;
// Update a Payment by ID
const updatePaymentById = async (req, res) => {
    try {
        const { client, vendor, amount, paymentDate, paymentMethod } = req.body;
        const updatedPayment = await Payment_1.default.findByIdAndUpdate(req.params.id, {
            client,
            vendor,
            amount,
            paymentDate,
            paymentMethod,
        }, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(updatedPayment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update payment' });
    }
};
exports.updatePaymentById = updatePaymentById;
// Delete a Payment by ID
const deletePayment = async (req, res) => {
    try {
        const deletedPayment = await Payment_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json({ message: 'Payment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete payment' });
    }
};
exports.deletePayment = deletePayment;
// Get All Payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment_1.default.find();
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve payments' });
    }
};
exports.getAllPayments = getAllPayments;
//# sourceMappingURL=Payment.js.map