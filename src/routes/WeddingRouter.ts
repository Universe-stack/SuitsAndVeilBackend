import express from 'express';
import {
  createWedding,
  getWedding,
  updateWedding,
  deleteWedding,
} from '../controllers/Wedding'; // Import your controller functions

//import { authenticateUser } from '../middlewares/authMiddleware'; // Import authentication middleware if needed

const weddingRouter = express.Router();

// Create a new wedding
weddingRouter.post('/weddings', createWedding);

// Get a specific wedding by ID
weddingRouter.get('/weddings/:id', getWedding);

// Update a wedding by ID
weddingRouter.put('/weddings/:id', updateWedding);

// Delete a wedding by ID
weddingRouter.delete('/weddings/:id', deleteWedding);

export default weddingRouter;
