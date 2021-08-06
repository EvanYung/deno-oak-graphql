import { Application, Router } from 'oak'
import chalkin from 'chalkin'
import logger from 'logger'

import { Static, ErrorCatcher } from './middlewares/mod.ts'

import routerApi from './router/mod.ts'

const app = new Application()
const router = new Router({ prefix: '/deno' })
app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(`Listening on: ${chalkin.green(`${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port}`)}`)
})

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

router.use(routerApi.routes())

app.use(router.routes()).use(router.allowedMethods())

await app.listen({ port: 8001 })
