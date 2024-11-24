import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { CONFIG } from '../config'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { token } = req.session as any
  console.log('hi middleware', req.session)
  if (!token) {
    res.status(403).json({
      message: 'No Auth Token'
    })
    return
  }

  const payload = jwt.verify(token, CONFIG.JWT_KEY)

  if (!payload) {
    res.status(403).json({
      message: 'Invalid or Expired Token'
    })
    return
  }
  res.locals.user = payload
  next()

}