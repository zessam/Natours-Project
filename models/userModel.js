const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [30, 'A user name must less or equal than 30 characters'],
    minlength: [5, 'A user name must more or equal than 5 characters']
  },
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
      // Works On Save & Create Only !!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match'
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

// Pre save middleware to encrypt the passwords
userSchema.pre('save', async function(next) {
  // Only run if it is modified
  if (!this.isModified('password')) return next();

  // HASH
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
