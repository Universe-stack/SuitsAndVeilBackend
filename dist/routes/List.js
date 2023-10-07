"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const List_1 = require("../controllers/List");
//import { authenticateUser } from '../middlewares/authMiddleware';
const router = express_1.default.Router();
// Create a new list
router.post('/lists', List_1.createList);
// Get a list by ID
router.get('/lists/:id', List_1.getList);
// Update a list by ID
router.put('/lists/:id', List_1.updateList);
// Delete a list by ID
router.delete('/lists/:id', List_1.deleteList);
exports.default = router;
//# sourceMappingURL=List.js.map