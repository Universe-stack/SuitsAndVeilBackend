import { Request, Response } from 'express';
import Wedding, { IWedding } from '../models/Wedding'; // Import the Wedding model
import mongoose from "mongoose";

// Create a new wedding
export const createWedding = async (req: Request, res: Response) => {
  try {

    const userId = new mongoose.Types.ObjectId((req.user as { _id: string })._id.toString());
    const { brideName, groomName,weddingDate,location,guestCount,budget, planner,vendors } = req.body;
    // Create a new list
    const newWedding: IWedding = new Wedding({
      brideName,
      groomName,
      weddingDate,
      location,
      guestCount,
      budget,
      planner,
      vendors,
      createdBy: userId,
    });

    // Save the list to the database
    const createdWedding = await newWedding.save();

    res.status(201).json(createdWedding); // Respond with the created wedding data
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific wedding by ID
export const getWedding = async (req: Request, res: Response) => {
  try {
    const weddingId = req.params.id; // Get the wedding ID from the URL parameter

    // Find the wedding by ID in the database
    const wedding = await Wedding.findById(weddingId);

    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }

    res.status(200).json(wedding); // Respond with the found wedding data
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a wedding by ID
export const updateWedding = async (req: Request, res: Response) => {
  try {
    const weddingId = req.params.id; // Get the wedding ID from the URL parameter
    const updateData = req.body; // Get the updated wedding data from the request body

    // Find and update the wedding by ID in the database
    const updatedWedding = await Wedding.findByIdAndUpdate(
      weddingId,
      updateData,
      { new: true } // Return the updated wedding data
    );

    if (!updatedWedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }

    res.status(200).json(updatedWedding); // Respond with the updated wedding data
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a wedding by ID
export const deleteWedding = async (req: Request, res: Response) => {
  try {
    const weddingId = req.params.id; // Get the wedding ID from the URL parameter

    // Find and delete the wedding by ID in the database
    const deletedWedding = await Wedding.findByIdAndDelete(weddingId);

    if (!deletedWedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }

    res.status(204).send(); // Respond with a success status code (No Content)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
