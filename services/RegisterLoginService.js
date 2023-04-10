const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');


 //Register

const registerUser = async (createUserInput) => {
    const { name, email, password, tlf, role } = createUserInput;

    // Validate request body
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with that email already exists');
      }
  
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        tlf: tlf || 0,
        role: role || 'customer',
      });
      await newUser.save();
      return newUser
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
        
    }
};


//Login

const loginUser = async (loginUserInput) => {
    const { email, password } = loginUserInput;
  
    // Validate request body
    if (!email || !password) {
        throw new Error('email and password are required !');
    }
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password ');
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password ');

      }
  
      // Create JWT
      const tokenPayload = { userId: user._id, role: user.role };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return success response
      return {
        message: 'Login successful',
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role
        }
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error login in !');
    }
};

module.exports = {registerUser, loginUser};