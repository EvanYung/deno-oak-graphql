import { connect } from 'deps'
import { db } from './config.ts'

const database = await connect(db)

export default database
