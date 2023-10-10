"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Payment_1 = require("../controllers/Payment");
const paymentRouter = express_1.default.Router();
// Create a Payment
paymentRouter.post('/', Payment_1.createPayment);
// Get a Payment by ID
paymentRouter.get('/:id', Payment_1.getPaymentById);
// Update a Payment by ID
paymentRouter.put('/:id', Payment_1.updatePaymentById);
// Delete a Payment by ID
paymentRouter.delete('/:id', Payment_1.deletePayment);
// Get All Payments
paymentRouter.get('/all', Payment_1.getAllPayments);
exports.default = paymentRouter;
//# sourceMappingURL=paymentRouter.js.map