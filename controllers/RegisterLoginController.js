const { registerUser, loginUser, } = require('../services/RegisterLoginService');


//Register

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({ message: 'User created successfully', user: user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


//Login

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return res.status(201).json({ message: 'User loged in successfully', result: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  };
  
module.exports = { login, register }