import { config } from './deps.ts'

const env = config()

export const port = Number(env.PORT)

export const db = {
  // deno-lint-ignore no-explicit-any
  type: env.DB_TYPE as any,
  port: Number(env.DB_PORT),
  database: env.DB_DATABASE,
  hostname: env.DB_HOSTNAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD
}
