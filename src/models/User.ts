import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
    minlength: [6, 'Mininum password length is 6 caracters']
  }
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel
