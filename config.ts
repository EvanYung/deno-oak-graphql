import { config } from './deps.ts'

const env = config()

export const port = Number(env.PORT)

export const dbConf = {
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  database: env.DB_DATABASE,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD
}
