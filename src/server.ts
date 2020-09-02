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
    console.log('\x1b[36m[INFO]\x1b[0m Database Connected.\n')
    app.listen(3000, () => {
      console.log(
        `\x1b[32m[SUCCESS]\x1b[0m Server started! Access at: http://localhost:${port}.\n`
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
