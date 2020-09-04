import jwt, { VerifyCallback } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export default function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt

  if(token) {
    jwt.verify(token, 'net ninja secret', (err => {
      if(err) {
        console.error(err.message)
        res.redirect('/login')
      }

      next()
    }) as VerifyCallback)
  }

  res.redirect('/login')
}
