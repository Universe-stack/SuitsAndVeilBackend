import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/User';
import { verifyUser,verifyAdmin,verifyVendor } from '../middlewares/authMiddleware';

const userRouter = express.Router();

// User registration route
userRouter.post('/register', registerUser);

// User login route
userRouter.post('/login', loginUser);

// User logout route
userRouter.post('/logout', verifyUser, logoutUser);

// Get user profile route
userRouter.get('/profile',verifyUser, getUserProfile);

// Update user profile route
userRouter.put('/profile',verifyUser, updateUserProfile);

// Get all users route (admin only)
userRouter.get('/all',verifyAdmin, getAllUsers);

// Get user by ID route (admin only)
userRouter.get('/:id',verifyAdmin, getUserById);

// Update user by ID route (admin only)
userRouter.put('/:id',verifyAdmin, updateUser);

// Delete user by ID route (admin only)
userRouter.delete('/:id', verifyAdmin, deleteUser);

export default userRouter;
