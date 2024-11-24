import authRouter from './auth/auth.routes'
import groupsRouter from './groups/groups.routes'
import {Router} from 'express'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/groups', groupsRouter)

export default appRouter