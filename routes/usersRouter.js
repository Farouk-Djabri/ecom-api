const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const {
  register,
  login,
} = require('../controllers/authController');

router.route('/create').post(createUser);
router.route('/users').get(getAllUsers);
router.route('/user/:id').get(getUserById);
router.route('/user/:id').patch(updateUser);
router.route('/user/:id').delete(deleteUser);


router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;