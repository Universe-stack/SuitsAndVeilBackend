import { Request, Response } from 'express';
import List, { IList } from '../models/List';

// Create a new list
export const createList = async (req: Request, res: Response) => {
  try {
    // Get user ID from the authenticated user
    //const userId = req.user._id;
    const userId ="Temporary";

    // Extract data from the request body
    const { name, items, collaborators, amount } = req.body;

    // Create a new list
    const newList: IList = new List({
      name,
      items,
      collaborators,
      amount,
      createdBy: userId,
    });

    // Save the list to the database
    const savedList = await newList.save();

    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a list by ID
export const getList = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;

    // Find the list by ID
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a list by ID
export const updateList = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;

    // Find the list by ID
    const list = await List.findById(listId);

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
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a list by ID
export const deleteList = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;

    // Find the list by ID
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Delete the list from the database
    await list.deleteOne();

    res.status(204).json({ message: 'List deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
