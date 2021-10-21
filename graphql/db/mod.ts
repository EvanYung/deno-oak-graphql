import { Database, MySQLConnector, Relationships } from 'deps'
import { dbConf } from 'config'
import models, { Author, Quote } from './models/mod.ts'

const connector = new MySQLConnector(dbConf)

const db = new Database(connector)

Relationships.belongsTo(Quote, Author)

db.link(models)

db.sync()

export default db
