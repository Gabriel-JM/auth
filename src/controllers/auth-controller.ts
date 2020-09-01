import { Request, Response } from 'express'
import { UserInfo } from '../types/user-info'
import UserModel from '../models/User'

function handleErrors(err: any) {
  console.log('\x1b[31m[ERROR]\x1b[0m', err.message)
  const errors: { [key: string]: any } = { email: '', password: '' }

  if(err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach((mongoError: any) => {
      errors[mongoError.properties.path] = mongoError.properties.message
    })
  }

  if(err.code === 11000) {
    errors.email = 'Duplicated Key, this Email already exists!'
  }

  return errors
}

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
    const errors = handleErrors(err)
    res.status(400).json(errors)
  }
}

export function loginPost(req: Request, res: Response) {
  const { email, password } = req.body as UserInfo

  res.send('user login')
}
