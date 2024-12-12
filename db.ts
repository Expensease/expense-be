import { Db, MongoClient } from 'mongodb'

type TConnect = {
  client: MongoClient,
  db: Db
}

globalThis.mongoClient = null
export async function connect(): Promise<TConnect> {
  const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/test'

  console.log('dbURL', dbURL)
  if (globalThis.mongoClient) {
    console.log('using staled connection')
    return { client: globalThis.mongoClient, db: globalThis.mongoClient.db() }
  }
  const client = new MongoClient(dbURL, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
  })
  client.on('timeout', () => {
  })
  const mongoClient = await client.connect()
  globalThis.mongoClient = mongoClient
  console.log('connected to db...')
  const db = mongoClient.db()
  return { client: mongoClient, db }
}
