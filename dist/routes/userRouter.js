"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userRouter = express_1.default.Router();
// User registration route
userRouter.post('/register', User_1.registerUser);
// User login route
userRouter.post('/login', User_1.loginUser);
// User logout route
userRouter.post('/logout', User_1.logoutUser);
// Get user profile route
userRouter.get('/profile', User_1.getUserProfile);
// Update user profile route
userRouter.put('/profile', User_1.updateUserProfile);
// Get all users route (admin only)
userRouter.get('/all', authMiddleware_1.verifyAdmin, User_1.getAllUsers);
// Get user by ID route (admin only)
userRouter.get('/:id', User_1.getUserById);
// Update user by ID route (admin only)
userRouter.put('/:id', User_1.updateUser);
// Delete user by ID route (admin only)
userRouter.delete('/:id', User_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map