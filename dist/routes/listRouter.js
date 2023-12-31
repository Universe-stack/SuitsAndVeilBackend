"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const List_1 = require("../controllers/List");
//import { authenticateUser } from '../middlewares/authMiddleware';
const listRouter = express_1.default.Router();
// Create a new list
listRouter.post("/new", List_1.createList);
// get all lists
listRouter.get("/", List_1.getAllList);
// Get a list by ID
listRouter.get("/:id", List_1.getList);
// Update a list by ID
listRouter.put("/:id", List_1.updateList);
// Delete a list by ID
listRouter.delete("/:id", List_1.deleteList);
exports.default = listRouter;
//# sourceMappingURL=listRouter.js.map