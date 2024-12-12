import { Router } from 'express'
import { createHmac } from 'node:crypto'
import { connect } from '../../db'
import { sign } from 'jsonwebtoken'
import { CONFIG } from '../../config'

const authRouter = Router()
const secret = process.env.HASH_PASS || ''

authRouter.post('/sign-up', async (req, res) => {
  const { email, password, name } = req.body

  const { db } = await connect()
  let user = await db.collection('users').findOne({ email })
  if (user) {
    res.status(400).json({ error: 'Email not available' })
    return
  }
  const hashPassword = createHmac('sha256', secret).update(password).digest('hex')

  const newUser = await db.collection('users').insertOne({ email, password: hashPassword, name, createdAt: new Date() })
  const token = sign({ id: newUser.insertedId, email }, CONFIG.JWT_KEY)

  // Store the token in a cookie
  res.cookie('Auth-Token', token, { httpOnly: true, secure: false }) // Set secure: true for HTTPS in production

  // @ts-ignore
  // req.session.userId = newUser.insertedId
  // // @ts-ignore
  // req.session.token = token


  res.json({
    ...newUser,
    token
  })
  return
})


authRouter.post('/sign-in', async (req, res) => {
  const { email, password } = req.body

  const { db } = await connect()
  const hashPassword = createHmac('sha256', secret).update(password).digest('hex')

  let user = await db.collection('users').findOne({ email })

  if (!user) {
    res.status(400).json({ error: 'Email/Password is incorrect' })
    return
  }
  if (user.password !== hashPassword) {
    res.status(400).json({ error: 'Email/Password is incorrect' })
    return
  }

  delete user.password
  const token = sign({ id: user._id, email }, CONFIG.JWT_KEY)

  // TODO: need to check why this cookie is not getting set in ui
  // Store the token in a cookie
  res.cookie('Auth-Token', token, { httpOnly: true, secure: false }) // Set secure: true for HTTPS in production

  // @ts-ignore
  // req.session.userId = user._id
  // // @ts-ignore
  // req.session.token = token

  res.json({
    ...user,
    token
  })

  return
})

authRouter.get('/log-out', async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ message: 'Logout failed' })
      }
      res.clearCookie('my-test-session')
      res.json({ message: 'Logout successful' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
    return
  }
})

export default authRouter
