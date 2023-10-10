import express from 'express';
import {
  createWedding,
  getWedding,
  updateWedding,
  deleteWedding,
} from '../controllers/Wedding'; // Import your controller functions

import {verifyUser,verifyAdmin } from '../middlewares/authMiddleware'; // Import authentication middleware if needed

const weddingRouter = express.Router();

// Create a new wedding
weddingRouter.post('/', verifyUser, createWedding);

// Get a specific wedding by ID
weddingRouter.get('/:id',verifyUser, getWedding);

// Update a wedding by ID
weddingRouter.put('/:id',verifyUser, updateWedding);

// Delete a wedding by ID
weddingRouter.delete('/:id', verifyUser, deleteWedding);

export default weddingRouter;
