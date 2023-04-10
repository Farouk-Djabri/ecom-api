const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Authentication middleware
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authentication failed' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication failed' });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Authorization middleware for sellers
exports.authorizeSeller = (req, res, next) => {
  const userId = req.user.id;

  User.findById(userId)
    .then((user) => {
      if (!user || user.role !== 'seller') {
        return res.status(403).json({ message: 'Authorization failed' });
      }
      next();
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

// Authorization middleware for customers
exports.authorizeCustomer = (req, res, next) => {
  const userId = req.user.id;

  User.findById(userId)
    .then((user) => {
      if (!user || user.role !== 'customer') {
        return res.status(403).json({ message: 'Authorization failed' });
      }
      next();
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
