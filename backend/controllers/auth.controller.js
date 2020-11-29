'use strict';

const {
  SECRET_KEY,
  TOKEN_EXPIRATION_TIME,
  SALT_WORK_FACTOR,
} = require('../config/constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SysUser = require('../models/sysuser');

const signUp = async(req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.sendStatus(400);
    }
    // Check if username already exists
    const existsSysUser = await SysUser.findOne({ username });
    if (existsSysUser) {
      res.sendStatus(418);
    }
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, SALT_WORK_FACTOR);
    const newSysUser = new SysUser({
      username: username,
      password: hashedPassword
    });
    const sysUser = await newSysUser.save();
    res.json(sysUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const login = async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.sendStatus(400);
  }
  const sysUser = await SysUser.findOne({ username });
  // login successs
  if (sysUser && bcrypt.compareSync(password, sysUser.password)) {
    const token = jwt.sign({ sysUser }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION_TIME });
    res.json({
      token,
    });
  } else { // failed login
    res.sendStatus(403);
  }
};

// Auth middleware that checks if request has a token
const checkToken = async(req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.token = bearerToken;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  signUp,
  login,
  checkToken,
};
