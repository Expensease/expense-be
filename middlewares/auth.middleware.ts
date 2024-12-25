import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CONFIG } from '../config'
import { connect } from "../db";
import { ObjectId } from "mongodb";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // const { token } = req.cookies as any
  const token = req.headers.token as string
  console.log('inside middleware', token)
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
  // check if user is valid user
  const { db } = await connect()
  const user = await db.collection('users').findOne({ _id: new ObjectId((payload as JwtPayload).id) })
  if (!user) {
    res.status(403).json({
      message: 'Invalid User'
    })
    return
  }
  console.log(payload, user, 'user')
  res.locals.user = payload
  next()

}