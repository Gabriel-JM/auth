import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

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

userSchema.pre('save', async function(this: any, next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel
