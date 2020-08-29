import { app } from './main/app'
import mongoose from 'mongoose'

const dbUri = 'mongodb+srv://gabriel:gabriel@mycluster.yfxw4.mongodb.net/node-auth'

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.clear()
    console.log('\x1b[33m[INFO] Database Connected.\n', '\x1b[0m')
    app.listen(3000, () => console.log('[Server] Running at Port: 3000'))
  })
  .catch(
    error => console.error(error)
  )
;