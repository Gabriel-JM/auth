import express from 'express'
import authRoutes from '../routes/authRoutes'

const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(authRoutes)

app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))

export { app }
