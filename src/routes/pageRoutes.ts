import { Router } from 'express'

const routes = Router()

routes
  .get('/', (req, res) => res.render('home'))
  .get('/smoothies', (req, res) => res.render('smoothies'))

export default routes
