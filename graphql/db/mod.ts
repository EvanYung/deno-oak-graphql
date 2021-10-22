import { Database, MySQLConnector } from 'deps'
import { dbConf } from 'config'
import models from './models/mod.ts'

const connector = new MySQLConnector(dbConf)

const db = new Database(connector)

db.link(models)

try {
  await db.sync()
} catch (_err) {
  //
}

export default db
