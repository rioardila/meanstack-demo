'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/auth', require('./routes').auth);
app.use('/api/users', require('./routes').users);

// Start server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
