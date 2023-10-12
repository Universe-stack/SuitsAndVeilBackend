"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Wedding_1 = require("../controllers/Wedding"); // Import your controller functions
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import authentication middleware if needed
const cors_1 = require("./cors");
const weddingRouter = express_1.default.Router();
// Create a new wedding
weddingRouter.post('/', cors_1.corsMiddleware, authMiddleware_1.verifyUser, Wedding_1.createWedding);
// Get a specific wedding by ID
weddingRouter.get('/:id', cors_1.corsMiddleware, authMiddleware_1.verifyUser, Wedding_1.getWedding);
// Update a wedding by ID
weddingRouter.put('/:id', cors_1.corsMiddleware, authMiddleware_1.verifyUser, Wedding_1.updateWedding);
// Delete a wedding by ID
weddingRouter.delete('/:id', cors_1.corsMiddleware, authMiddleware_1.verifyUser, Wedding_1.deleteWedding);
exports.default = weddingRouter;
//# sourceMappingURL=WeddingRouter.js.map