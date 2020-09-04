import express from 'express'
import authRoutes from '../routes/authRoutes'
import pageRoutes from '../routes/pageRoutes'
import cookieParser from 'cookie-parser'
import checkUser from '../middleware/checkUserMiddleware'

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.get('*', checkUser)
app.use(pageRoutes)
app.use(authRoutes)


export { app }
