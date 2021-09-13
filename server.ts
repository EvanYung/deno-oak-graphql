import app from './app.ts'
import { colors } from './deps.ts'
import { GraphQLService } from './graphql/mod.ts'
import { port } from 'config'

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(`Listening on: ${colors.green(`${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port}`)}`)
})

app.use(GraphQLService.routes(), GraphQLService.allowedMethods())

await app.listen({ hostname: '127.0.0.1', port })
