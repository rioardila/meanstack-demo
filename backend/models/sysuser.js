'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sysUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('SysUser', sysUserSchema);
