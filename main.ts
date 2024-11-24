import Express from 'express'
import dotenv from 'dotenv'
import appRouter from './api/routes'
// import cookieSession from 'cookie-session'
import session from 'express-session'

const envPath: Record<string, string> = {
  development: '.env.development',
  production: '.env.production'
}

const env = process.env.NODE_ENV || 'development'

dotenv.config({
  path: envPath[env]
})


const app = Express()

app.use(Express.json())
app.use(
  session({
    name: 'my-test-session',
    secret: 's1',
    // maxAge: 24 * 60 * 60 * 1000, // 24 hours
    cookie: { secure: false }, // for development, set 'secure: false' unless using https
    resave: false,
    saveUninitialized: true,
  })
)

app.use('/api', appRouter)

app.use('*', (req, res) => {
  res.json('Welcome to the Expense Ease Backend API')
})

app.listen(3000, () => console.log('Running at port 3000...'))
