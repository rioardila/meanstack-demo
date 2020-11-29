'use strict';

const User = require('../models/user');
const Car = require('../models/car');

const getUsers = async(req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getUser = async(req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

const createUser = async(req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  const user = await newUser.save();
  res.json(user);
};

const replaceUser = async(req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  await User.findByIdAndUpdate(id, newUser);
  res.json({
    success: true,
  });
};

const deleteUser = async(req, res) => {
  const { id } = req.params;
  await User.findByIdAndRemove(id);
  res.json({
    success: true,
  });
};

const getUserCars = async(req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('car');
  res.json(user);
};

const addCarToUser = async(req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const newCar = new Car(req.body);
  user.cars.push(newCar);
  const newUser = await user.save();
  res.json(newUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  replaceUser,
  deleteUser,
  getUserCars,
  addCarToUser,
};
