import { path } from '../../deps.ts'
import { db } from '../../config.ts'
import { writeJson } from '../../utils/mod.ts'

const __dirname = path.dirname(path.fromFileUrl(import.meta.url))
const filePath = path.resolve(__dirname, '../../ormconfig.json')

writeJson(filePath, db)
