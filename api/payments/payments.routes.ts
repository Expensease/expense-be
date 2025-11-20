import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { connect } from '../../db'
import { ObjectId } from 'mongodb'

export const paymentRouter = Router()

paymentRouter.get('/:groupId', authMiddleware, async (req, res) => {
  // const { id: userId } = res.locals.user
  const { groupId } = req.params
  const { db } = await connect()

  const payments = await db.collection('payments')
    .aggregate([
      {
        $match: {
          // members: new ObjectId(userId),
          groupId: new ObjectId(groupId)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'members',
          foreignField: '_id',
          as: 'members'
        }
      },
      {
        $sort: {
          _id: -1
        }
      }
    ]).toArray()
  // .find({ members: userId }).toArray()

  res.send({ payments })
  return
})

paymentRouter.post('/', authMiddleware, async (req, res) => {
  // @ts-ignore
  const { id: userId } = res.locals.user
  const { amount, members, groupId, title, message } = req.body

  const { db } = await connect()

  const newPayment = await db.collection('payments').insertOne({
    amount,
    members: [...members.map(m => new ObjectId(m))],
    groupId: new ObjectId(groupId),
    title,
    message,
    createdAt: new Date(),
    createdBy: userId
  })

  res.send({ newPayment })
  return
})
