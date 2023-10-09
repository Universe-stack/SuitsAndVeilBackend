"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteList = exports.updateList = exports.getList = exports.getAllList = exports.createList = void 0;
const List_1 = __importDefault(require("../models/List"));
// Create a new list
const createList = async (req, res) => {
    try {
        // Get user ID from the authenticated user
        //const userId = req.user._id;
        const userId = 1;
        // Extract data from the request body
        const { name, items, collaborators, amount } = req.body;
        // Create a new list
        const newList = new List_1.default({
            name,
            items,
            collaborators,
            amount,
        });
        //createdBy: userId, This would go into the above object once authentication is implemented
        // Save the list to the database
        const savedList = await newList.save();
        res.status(201).json(savedList);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createList = createList;
// Get all lists
const getAllList = async (req, res) => {
    try {
        // Find all lists
        const lists = await List_1.default.find({});
        if (!lists) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.status(200).json(lists);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};
exports.getAllList = getAllList;
// Get a list by ID
const getList = async (req, res) => {
    try {
        const listId = req.params.id;
        console.log(listId);
        // Find the list by ID
        const list = await List_1.default.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.status(200).json(list);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};
exports.getList = getList;
// Update a list by ID
const updateList = async (req, res) => {
    try {
        const listId = req.params.id;
        // Find the list by ID
        const list = await List_1.default.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        // Extract data from the request body
        const { name, items, collaborators, amount } = req.body;
        // Update the list's fields
        list.name = name;
        list.items = items;
        list.collaborators = collaborators;
        list.amount = amount;
        // Save the updated list to the database
        const updatedList = await list.save();
        res.status(200).json(updatedList);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateList = updateList;
// Delete a list by ID
const deleteList = async (req, res) => {
    try {
        const listId = req.params.id;
        // Find the list by ID
        const list = await List_1.default.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        // Delete the list from the database
        await list.deleteOne();
        res.status(204).json({ message: 'List deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteList = deleteList;
//# sourceMappingURL=List.js.map