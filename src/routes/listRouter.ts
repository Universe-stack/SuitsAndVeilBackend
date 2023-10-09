import express from 'express';
import { createList, getList, updateList, deleteList,getAllList } from '../controllers/List';
//import { authenticateUser } from '../middlewares/authMiddleware';

const listRouter = express.Router();

// Create a new list
listRouter.post("/new", createList);

// get all lists
listRouter.get("/", getAllList);

// Get a list by ID
listRouter.get("/:id", getList);

// Update a list by ID
listRouter.put("/:id", updateList);

// Delete a list by ID
listRouter.delete("/:id", deleteList);

export default listRouter;
