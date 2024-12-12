import authRouter from './auth/auth.routes'
import groupsRouter from './groups/groups.routes'
import { Router } from 'express'
import { paymentRouter } from './payments/payments.routes'
import usersRouter from './users/users.routes'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/groups', groupsRouter)
appRouter.use('/payments', paymentRouter)
appRouter.use('/users', usersRouter)

export default appRouter