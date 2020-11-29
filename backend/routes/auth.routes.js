'use strict';

const router = require('express-promise-router')();
const {
  signUp,
  login,
} = require('../controllers/auth.controller');

// Signup user
router.post('/signup', signUp);

// Authenticate user
router.post('/login', login);

module.exports = router;
