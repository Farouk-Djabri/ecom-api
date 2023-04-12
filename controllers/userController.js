const User = require('../models/users');

const { create, getAll, getUser, update, deleteU} = require('../services/userService');


// GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
    }
};

// GET a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// CREATE a new user
const createUser = async (req, res) => {
  try {
    const user = await create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE a user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  try {
    await deleteU(req.params.id);
    res.status(200).json({ message: 'User deleted successfully!' });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });

  }
};


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };