import { config } from './deps.ts'

const mode = Deno.env.get('mode') || 'prod'

const env = config({ path: `.env.${mode}` })

export const port = Number(env.PORT)

export const dbConf = {
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  database: env.DB_DATABASE,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD
}
