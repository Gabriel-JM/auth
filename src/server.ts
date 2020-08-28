import { app } from './main/app'
import mongoose from 'mongoose'

const dbUri = 'mongodb+srv://gabriel:gabriel@mycluster.yfxw4.mongodb.net/MyCluster?retryWrites=true&w=majority'

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.clear()
    console.log('Database Connected')
    app.listen(3000, () => console.log('Server running...'))
  })
  .catch(
    error => console.error(error)
  )
;