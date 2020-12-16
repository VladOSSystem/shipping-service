const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    surname: {
      type: String,
      required: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }, 
    biography: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    }
  }, {
    timestamps: true,
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;