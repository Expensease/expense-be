import { MongoClient } from 'mongodb'
export async function connect() {
  const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/test'

  const client = new MongoClient(dbURL)
  const mongoClient = await client.connect()
  console.log('connected to db...')
  const db = mongoClient.db()
  return { client: mongoClient, db }
}
