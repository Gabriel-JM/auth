import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export default function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt

  if(token) {
    const decodedToken = jwt.verify(token, 'net ninja secret')

    if(decodedToken) next()
  }

  res.redirect('/login')
}
