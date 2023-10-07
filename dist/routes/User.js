"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
//import { authenticateUser, authenticateAdmin } from '../middlewares/authMiddleware';
const router = express_1.default.Router();
// User registration route
router.post('/register', User_1.registerUser);
// User login route
router.post('/login', User_1.loginUser);
// User logout route
router.post('/logout', User_1.logoutUser);
// Get user profile route
router.get('/profile', User_1.getUserProfile);
// Update user profile route
router.put('/profile', User_1.updateUserProfile);
// Get all users route (admin only)
router.get('/users', User_1.getAllUsers);
// Get user by ID route (admin only)
router.get('/users/:id', User_1.getUserById);
// Update user by ID route (admin only)
router.put('/users/:id', User_1.updateUser);
// Delete user by ID route (admin only)
router.delete('/users/:id', User_1.deleteUser);
exports.default = router;
//# sourceMappingURL=User.js.map