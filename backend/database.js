'use strict';

const mongoose = require('mongoose');
const { DB_URI } = require('./config/constants');

mongoose.set('useCreateIndex', true);

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Successfully connected to database'))
  .catch(err => console.log(err.message));

module.exports = mongoose;