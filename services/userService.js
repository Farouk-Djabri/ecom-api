const { Error } = require('mongoose');
const User = require('../models/users');
const { registerUser } = require('../services/authService');

// GET all users
const getAll = async () => {
    try {
      const users = await User.find();  
      return users;
    } catch (error) {
      console.error(error);
    }
  };

  // GET a single user by id
  const getUser = async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('An error has occured : '+ error.message);
    }
  };

// Create user
const create = async (createUserInput) =>{
    
    try {
        const user = await registerUser(createUserInput);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error ("can't create the user !");
    
    }
};

// UPDATE a user by ID
const update = async (id, updateUsertInput) => {
    const user = await getUser(id);
  try {
    if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
    await User.updateOne({ _id:id }, updateUsertInput);
    
  } catch (error) {
    throw new Error('Something went wrong : ' + error.message);
  }

    return  await getUser(id);
  };


// DELETE a user by ID
  const deleteU = async (id) => {
    const user = await getUser(id);
    if (!user) {
        throw new Error('user not found !');
    }
    await User.deleteOne({ _id:id });
  };



module.exports = { create, getAll, getUser, update, deleteU };