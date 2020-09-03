import mongoose, { Document } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

interface UserModelStatics {
  login(email: string, password: string): Promise<Document>
}

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

userSchema.statics.login = async function(email: string, password: string) {
  const user = await this.findOne({ email })

  if(user) {
    const isValid = await bcrypt.compare(password, user.password)

    if(isValid) return user

    throw new Error('Incorrect Password')
  }

  throw new Error('Incorrect Email')
}

const UserModel = mongoose.model('user', userSchema)

export default UserModel as mongoose.Model<mongoose.Document, {}> & UserModelStatics
