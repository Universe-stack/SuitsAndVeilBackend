import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/User';
//import { authenticateUser, authenticateAdmin } from '../middlewares/authMiddleware';

const userRouter = express.Router();

// User registration route
userRouter.post('/register', registerUser);

// User login route
userRouter.post('/login', loginUser);

// User logout route
userRouter.post('/logout', logoutUser);

// Get user profile route
userRouter.get('/profile', getUserProfile);

// Update user profile route
userRouter.put('/profile', updateUserProfile);

// Get all users route (admin only)
userRouter.get('/all', getAllUsers);

// Get user by ID route (admin only)
userRouter.get('/:id', getUserById);

// Update user by ID route (admin only)
userRouter.put('/:id', updateUser);

// Delete user by ID route (admin only)
userRouter.delete('/:id', deleteUser);

export default userRouter;
