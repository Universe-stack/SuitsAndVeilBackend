import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';

// User registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser: IUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token and send it in the response
    const token = generateAuthToken(user);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User logout
export const logoutUser = async (req: Request, res: Response) => {
  // You can handle logout logic here, such as clearing any authentication tokens or sessions.
  // For token-based authentication, you typically do not need to do anything on the server side.
  res.status(200).json({ message: 'Logout successful' });
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        // Find the user by their ID (req.user._id)
        const user = await User.findById(req.user._id);
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
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
};

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Implement logic to retrieve all users from the database (e.g., User.find({}))
    const users = await User.find();
    if (!users) {
        // If the user with the specified ID is not found, respond with a 404 status
        return res.status(404).json({ message: 'Users not found'});
      }
    // Ensure this route is protected for admin access only

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID (admin only)
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Implement logic to retrieve a user by their ID from the database (e.g., User.findById(userId))
    const user = await User.findById(userId);
    if (!user) {
        // If the user with the specified ID is not found, respond with a 404 status
        return res.status(404).json({ message: 'User not found'});
      }
    // Ensure this route is protected for admin access only

    // Return the user
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user by ID (admin only)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Implement logic to update a user by their ID based on the data in req.body
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true, // Return the updated user data
      });
  
      if (!updatedUser) {
        // If the user with the specified ID is not found, respond with a 404 status
        return res.status(404).json({ message: 'User not Updated'});
      }
    // Ensure this route is protected for admin access only
    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error.message)
  }
};

// Delete user by ID (admin only)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    // Implement logic to delete a user by their ID from the database (e.g., User.findByIdAndDelete(userId));
    const deletedUser = User.findByIdAndDelete(userId);
    if(!deletedUser){
        return res.status(404).json({ message: 'User not deleted'});
    }
    // Ensure this route is protected for admin access
} catch(error){
    res.status(500).json({ message: 'Server error' });
    console.log(error.message)
}
}
