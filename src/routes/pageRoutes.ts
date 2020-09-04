import { Router } from 'express'
import requireAuth from '../middleware/authMiddleware'

const routes = Router()

routes
  .get('/', (req, res) => res.render('home'))
  .get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))

export default routes
