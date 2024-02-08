const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [30, 'A user name must less or equal than 30 characters'],
    minlength: [5, 'A user name must more or equal than 5 characters']
  },
  slug: String,
  email: {
    type: String,
    required: [true, 'A user must have a valid email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid Email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    maxlength: 100,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(v) {
        return v === this.password;
      },
      message: props => 'Passwords do not match'
    }
  },
  photo: {
    type: String
  }
});

// Mongo Middleware to save in lowercase
// userSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
