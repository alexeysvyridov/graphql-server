const mongoose = require("mongoose");
// const {composeWithMongoose} = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  collection: 'users',
});

module.exports = User;