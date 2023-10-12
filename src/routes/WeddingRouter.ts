import express from 'express';
import {
  createWedding,
  getWedding,
  updateWedding,
  deleteWedding,
} from '../controllers/Wedding'; // Import your controller functions

import {verifyUser,verifyAdmin } from '../middlewares/authMiddleware'; // Import authentication middleware if needed
import { corsMiddleware, corsWithOptionsMiddleware } from './cors';


const weddingRouter = express.Router();

// Create a new wedding
weddingRouter.post('/', corsMiddleware, verifyUser, createWedding);

// Get a specific wedding by ID
weddingRouter.get('/:id', corsMiddleware, verifyUser, getWedding);

// Update a wedding by ID
weddingRouter.put('/:id',corsMiddleware,verifyUser, updateWedding);

// Delete a wedding by ID
weddingRouter.delete('/:id', corsMiddleware, verifyUser, deleteWedding);

export default weddingRouter;
