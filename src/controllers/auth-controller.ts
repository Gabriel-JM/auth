import { Request, Response } from 'express'

export function signupGet(req: Request, res: Response) {
  res.render('signup')
}

export function loginGet(req: Request, res: Response) {
  res.render('login')
}

export function signupPost(req: Request, res: Response) {
  res.send('new signup')
}

export function loginPost(req: Request, res: Response) {
  res.send('user login')
}
