"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWedding = exports.updateWedding = exports.getWedding = exports.createWedding = void 0;
const Wedding_1 = __importDefault(require("../models/Wedding")); // Import the Wedding model
// Create a new wedding
const createWedding = async (req, res) => {
    try {
        //const userId = req.user._id;
        const userId = "Temporary";
        const { brideName, groomName, weddingDate, location, guestCount, budget, planner, vendors } = req.body;
        // Create a new list
        const newWedding = new Wedding_1.default({
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
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createWedding = createWedding;
// Get a specific wedding by ID
const getWedding = async (req, res) => {
    try {
        const weddingId = req.params.id; // Get the wedding ID from the URL parameter
        // Find the wedding by ID in the database
        const wedding = await Wedding_1.default.findById(weddingId);
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }
        res.status(200).json(wedding); // Respond with the found wedding data
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getWedding = getWedding;
// Update a wedding by ID
const updateWedding = async (req, res) => {
    try {
        const weddingId = req.params.id; // Get the wedding ID from the URL parameter
        const updateData = req.body; // Get the updated wedding data from the request body
        // Find and update the wedding by ID in the database
        const updatedWedding = await Wedding_1.default.findByIdAndUpdate(weddingId, updateData, { new: true } // Return the updated wedding data
        );
        if (!updatedWedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }
        res.status(200).json(updatedWedding); // Respond with the updated wedding data
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateWedding = updateWedding;
// Delete a wedding by ID
const deleteWedding = async (req, res) => {
    try {
        const weddingId = req.params.id; // Get the wedding ID from the URL parameter
        // Find and delete the wedding by ID in the database
        const deletedWedding = await Wedding_1.default.findByIdAndDelete(weddingId);
        if (!deletedWedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }
        res.status(204).send(); // Respond with a success status code (No Content)
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteWedding = deleteWedding;
//# sourceMappingURL=Wedding.js.map