import { Request, Response } from 'express'
import { UserInfo } from '../types/user-info'
import UserModel from '../models/User'

export function signupGet(req: Request, res: Response) {
  res.render('signup')
}

export function loginGet(req: Request, res: Response) {
  res.render('login')
}

export async function signupPost(req: Request, res: Response) {
  const { email, password } = req.body as UserInfo

  try {
    const user = await UserModel.create({ email, password })

    res.status(201).json(user)
  } catch(err) {
    console.log('\x1b[31m[ERROR]\x1b[0m', err.message)
    res.status(400).json('error, user not created.')
  }
}

export function loginPost(req: Request, res: Response) {
  const { email, password } = req.body as UserInfo

  res.send('user login')
}
