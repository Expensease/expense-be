import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { connect } from '../../db'

export const paymentRouter = Router()

paymentRouter.get('/', authMiddleware, async (req, res) => {
  // @ts-ignore
  const { userId } = req.session

  const { db } = await connect()

  const payments = await db.collection('payments').find({ members: userId }).toArray()

  res.send({ payments })
  return
})

paymentRouter.post('/', authMiddleware, async (req, res) => {
  // @ts-ignore
  const { userId } = req.session
  const { amount, members, groupId, title, message } = req.body

  const { db } = await connect()

  const newPayment = await db.collection('payments').insertOne({
    amount,
    members: [...members, userId],
    groupId,
    title,
    message,
    createdAt: new Date(),
    createdBy: userId
  })

  res.send({ newPayment })
  return
})
