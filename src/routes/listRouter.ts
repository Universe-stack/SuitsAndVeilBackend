import express from 'express';
import { createList, getList, updateList, deleteList } from '../controllers/List';
//import { authenticateUser } from '../middlewares/authMiddleware';

const listRouter = express.Router();

// Create a new list
listRouter.post('/lists', createList);

// Get a list by ID
listRouter.get('/lists/:id', getList);

// Update a list by ID
listRouter.put('/lists/:id', updateList);

// Delete a list by ID
listRouter.delete('/lists/:id', deleteList);

export default listRouter;
