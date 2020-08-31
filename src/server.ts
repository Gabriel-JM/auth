import { app } from './main/app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbUri = process.env.MONGODB_URL || ''
const port = process.env.PORT || 3000

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.clear()
    console.log('\x1b[33m[INFO] Database Connected.\n', '\x1b[0m')
    app.listen(3000, () => {
      console.log(
        '\x1b[32m[SUCCESS] Server started!!!\x1b[0m\n'+
        '[SERVER] Access at: http://localhost:' + port
      )
    })
  })
  .catch(
    error => {
      console.clear()
      console.error('\x1b[31m[ERROR]\x1b[0m', error.message)
    }
  )
;