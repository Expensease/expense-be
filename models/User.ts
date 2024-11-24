import { createHmac } from 'crypto'
import { MongoBase } from './index'
const secret = process.env.HASH_PASS || ''


export class User extends MongoBase {

  name: string
  email: string
  createAt: Date
  password: string


  constructor(newUser: User) {
    super()

  }

  async createNewUser(userData) {
    const { email, password, name } = userData
    const hashPassword = createHmac('sha256', secret).update(password).digest('hex')

    const newUser = await this.db
      .collection('users')
      .insertOne({ email, password: hashPassword, name: '', createdAt: new Date() })
    return newUser
  }



}

export default User
