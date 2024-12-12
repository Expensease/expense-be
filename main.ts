import Express from 'express'
import dotenv from 'dotenv'
import appRouter from './api/routes'
// import cookieSession from 'cookie-session'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connect } from './db'

const envPath: Record<string, string> = {
  development: '.env.development',
  production: '.env.production'
}

const env = process.env.NODE_ENV || 'development'

dotenv.config({
  path: envPath[env]
})


const app = Express()

connect()

app.use(cors({
  origin: '*',
  credentials: true // Allow cookies to be sent with the reques
}))
app.use(cookieParser())
app.use(Express.json())

// app.use(
//   session({
//     name: 'my-expense-session',
//     secret: 's1',
//     // maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // for development, set 'secure: false' unless using https
//     resave: false,
//     saveUninitialized: true
//   })
// )

app.use('/api', appRouter)

app.use('*', (req, res) => {
  res.json('Welcome to the Expense Ease Backend API')
})

app.listen(4000, () => console.log('Running at port 4000...'))

