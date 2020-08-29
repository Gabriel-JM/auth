import { Router } from 'express'
import { signupGet, signupPost, loginGet, loginPost } from '../controllers/auth-controller'

const routes = Router()

routes
  .get('/signup', signupGet)
  .post('/signup', signupPost)
  .get('/login', loginGet)
  .post('/login', loginPost)

export default routes
