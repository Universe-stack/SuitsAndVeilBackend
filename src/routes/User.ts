import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/User';
//import { authenticateUser, authenticateAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.post('/logout', logoutUser);

// Get user profile route
router.get('/profile', getUserProfile);

// Update user profile route
router.put('/profile', updateUserProfile);

// Get all users route (admin only)
router.get('/users', getAllUsers);

// Get user by ID route (admin only)
router.get('/users/:id', getUserById);

// Update user by ID route (admin only)
router.put('/users/:id', updateUser);

// Delete user by ID route (admin only)
router.delete('/users/:id', deleteUser);

export default router;
