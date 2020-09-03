import express from 'express'
import authRoutes from '../routes/authRoutes'
import pageRoutes from '../routes/pageRoutes'
import cookiesRoutes from '../routes/cookiesRoutes'
import cookieParser from 'cookie-parser'

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.use(pageRoutes)
app.use(authRoutes)
app.use(cookiesRoutes)

export { app }
