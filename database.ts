import { connect } from './deps.ts'
import { db } from './config.ts'

const database = await connect(db)

export default database
