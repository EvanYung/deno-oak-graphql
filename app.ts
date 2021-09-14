import { Application } from './deps.ts'
import { logger } from './deps.ts'

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

export default app
