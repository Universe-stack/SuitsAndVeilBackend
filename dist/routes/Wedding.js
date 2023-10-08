"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Wedding_1 = require("../controllers/Wedding"); // Import your controller functions
//import { authenticateUser } from '../middlewares/authMiddleware'; // Import authentication middleware if needed
const weddingRouter = express_1.default.Router();
// Create a new wedding
weddingRouter.post('/weddings', Wedding_1.createWedding);
// Get a specific wedding by ID
weddingRouter.get('/weddings/:id', Wedding_1.getWedding);
// Update a wedding by ID
weddingRouter.put('/weddings/:id', Wedding_1.updateWedding);
// Delete a wedding by ID
weddingRouter.delete('/weddings/:id', Wedding_1.deleteWedding);
exports.default = weddingRouter;
//# sourceMappingURL=Wedding.js.map