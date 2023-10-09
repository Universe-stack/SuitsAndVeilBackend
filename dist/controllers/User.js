"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// User registration
const registerUser = async (req, res) => {
    try {
        const { username, password, name, role, email } = req.body;
        console.log(username, password);
        // Check if the username is already taken
        const existingUser = await User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }
        // Hash the password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Create a new user
        const newUser = new User_1.default({
            username,
            password: hashedPassword,
            name,
            role,
            email
        });
        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};
exports.registerUser = registerUser;
// User login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the user exists
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if the password is correct
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate a token and send it in the response
        //const token = generateAuthToken(user);
        const token = "Token";
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.loginUser = loginUser;
// User logout
const logoutUser = async (req, res) => {
    // You can handle logout logic here, such as clearing any authentication tokens or sessions.
    // For token-based authentication, you typically do not need to do anything on the server side.
    res.status(200).json({ message: 'Logout successful' });
};
exports.logoutUser = logoutUser;
// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUserProfile = getUserProfile;
// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        // Find the user by their ID (req.user._id)
        const user = await User_1.default.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update user profile fields here based on the data in req.body
        // For example, you can update user properties like name, email, or any other fields
        // Update user properties based on req.body data
        user.name = req.body.name || user.name; // Update the user's name if provided in req.body
        user.email = req.body.email || user.email; // Update the user's email if provided in req.body
        // Save the updated user profile
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateUserProfile = updateUserProfile;
// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        // Implement logic to retrieve all users from the database (e.g., User.find({}))
        const users = await User_1.default.find();
        if (!users) {
            // If the user with the specified ID is not found, respond with a 404 status
            return res.status(404).json({ message: 'Users not found' });
        }
        // Ensure this route is protected for admin access only
        // Return the list of users
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID (admin only)
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        // Implement logic to retrieve a user by their ID from the database (e.g., User.findById(userId))
        const user = await User_1.default.findById(userId);
        if (!user) {
            // If the user with the specified ID is not found, respond with a 404 status
            return res.status(404).json({ message: 'User not found' });
        }
        // Ensure this route is protected for admin access only
        // Return the user
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUserById = getUserById;
// Update user by ID (admin only)
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        // Implement logic to update a user by their ID based on the data in req.body
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, updateData, {
            new: true, // Return the updated user data
        });
        if (!updatedUser) {
            // If the user with the specified ID is not found, respond with a 404 status
            return res.status(404).json({ message: 'User not Updated' });
        }
        // Ensure this route is protected for admin access only
        // Return the updated user
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error.message);
    }
};
exports.updateUser = updateUser;
// Delete user by ID (admin only)
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // Implement logic to delete a user by their ID from the database (e.g., User.findByIdAndDelete(userId));
        const deletedUser = User_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not deleted' });
        }
        // Ensure this route is protected for admin access
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error.message);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=User.js.map