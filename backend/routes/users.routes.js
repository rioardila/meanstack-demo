'use strict';

const router = require('express-promise-router')();
const {
  checkToken,
} = require('../controllers/auth.controller');
const {
  getUsers,
  getUser,
  createUser,
  replaceUser,
  deleteUser,
  getUserCars,
  addCarToUser,
} = require('../controllers/user.controller');

// Get all users
router.get('/', checkToken, getUsers);
// Get a user by its id
router.get('/:id', checkToken, getUser);
// Create a new user
router.post('/', checkToken, createUser);
// Replace a user by its id
router.put('/:id', checkToken, replaceUser);
// Delete a user by its id
router.delete('/:id', checkToken, deleteUser);

// Get the list of cars from a user by its id
router.get('/:id/cars', checkToken, getUserCars);
// Add car to a user by its id
router.post('/:id/cars', checkToken, addCarToUser);

module.exports = router;
