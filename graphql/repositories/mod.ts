import { connect } from 'deps'
import { db } from 'config'
import models from './models/mod.ts'

const database = await connect({ ...db, models })

export default database
