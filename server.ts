import { Application, logger, colors } from './deps.ts'
import { port } from './config.ts'

import { GraphQLService } from './graphql/mod.ts'

import { Static, ErrorCatcher } from './middlewares/mod.ts'

const app = new Application()

app.addEventListener('error', (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error.message)
})

// logger
app.use(logger.logger)
app.use(logger.responseTime)

// static
app.use(Static)

// error catcher
app.use(ErrorCatcher)

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(`Listening on: ${colors.green(`${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port}`)}`)
})

// graphql
app.use(GraphQLService.routes(), GraphQLService.allowedMethods())

await app.listen({ hostname: '127.0.0.1', port })
