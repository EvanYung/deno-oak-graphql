import { path } from 'deps'

const __dirname = path.dirname(path.fromFileUrl(import.meta.url))
export default {
  port: 3010,
  database: {
    type: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      database: 'test',
      user: 'user',
      password: 'password'
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },
  defaultQuery: `

  `
}
