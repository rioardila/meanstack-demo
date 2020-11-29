'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'car',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
