import express from 'express';
import { createList, getList, updateList, deleteList } from '../controllers/List';
//import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Create a new list
router.post('/lists', createList);

// Get a list by ID
router.get('/lists/:id', getList);

// Update a list by ID
router.put('/lists/:id', updateList);

// Delete a list by ID
router.delete('/lists/:id', deleteList);

export default router;
