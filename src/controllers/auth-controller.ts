import { Request, Response } from 'express'
import { UserInfo } from '../types/user-info'
import UserModel from '../models/User'
import jwt from 'jsonwebtoken'

const maxAge = 3 * 24 * 60 * 60

function handleErrors(err: any) {
  console.log('\x1b[31m[ERROR]\x1b[0m', err.message)
  const errors: { [key: string]: any } = { email: '', password: '' }

  if(err.message === 'Incorrect Email') {
    errors.email = 'That Email is not registered'
  }

  if(err.message === 'Incorrect Password') {
    errors.password = 'The Password is incorrect'
  }

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

function createToken(id: string) {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  })
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

    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.status(201).json({ user: user._id })
  } catch(err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

export async function loginPost(req: Request, res: Response) {
  const { email, password } = req.body as UserInfo

  try {
    const user = await UserModel.login(email, password)

    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.status(200).json({ user: user._id })
  } catch(err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

export function logoutGet(req: Request, res: Response) {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}
