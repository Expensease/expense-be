import { Db, MongoClient } from "mongodb";
import { connect } from "../db";

export class MongoBase {
  db: Db
  client: MongoClient

  constructor() {
    connect().then(({ db, client }) => {
      this.db = db
      this.client = client
    })
  }

}

export default MongoBase
