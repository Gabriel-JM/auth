import express from 'express'
import authRoutes from '../routes/authRoutes'

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())

app.use(authRoutes)

app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))

export { app }
