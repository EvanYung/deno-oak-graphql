import { Application, Router } from './deps.ts'
import { logger } from './deps.ts'

import { Static, ErrorCatcher } from './middlewares/mod.ts'

import routerApi from './router/mod.ts'

const app = new Application()
export const router = new Router({ prefix: '/deno' })

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

export default app
