const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const users = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    default: null,
  },
  // token: {
  //   type: String,
  //   default: null,
  // },
  refresh: {
    type: String,
    default: null,
  },
});

users.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

users.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

users.methods.setToken = function (token) {
  this.token = token;
};

users.methods.setRefresh = function (refresh) {
  this.refresh = refresh;
};

const User = mongoose.model('user', users);

module.exports = User;
