import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyCallback } from 'jsonwebtoken'
import UserModel from '../models/User'

export default function checkUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt

  if(token) {
    jwt.verify(token, 'net ninja secret', (async (err, decoded) => {
      if(err) {
        res.locals.user = null
        next()
      }

      if(decoded) {
        const user = await UserModel.findById((decoded as { id: string }).id)
        res.locals.user = user
        next()
      }
    }) as VerifyCallback)
  }

  res.locals.user = null
  next()
}