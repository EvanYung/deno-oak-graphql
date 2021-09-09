import { Application, Router } from './deps.ts'
import { logger } from './deps.ts'

import { Static, ErrorCatcher } from './middlewares/mod.ts'

import routerApi from './router/mod.ts'

const app = new Application()
const router = new Router({ prefix: '/deno' })

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

const decoder = new TextDecoder()

// Echo back the request body as html, if any, as part of the response.
app.use(async (ctx) => {
  if (ctx.request.hasBody) {
    const body = ctx.request.body()
    ctx.response.body = `<!DOCTYPE html><html><body>
          <h1>Body type: "${body.type}"</h1>`
    switch (body.type) {
      case 'form':
        ctx.response.body += `<table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>`
        for (const [key, value] of await body.value) {
          ctx.response.body += `<tr><td>${key}</td><td>${value}</td></tr>`
        }
        ctx.response.body += `</tbody></table>`
        break
      case 'form-data': {
        const { fields } = await body.value.read()
        ctx.response.body += `<table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>`
        for (const [key, value] of Object.entries(fields)) {
          ctx.response.body += `<tr><td>${key}</td><td>${value}</td></tr>`
        }
        ctx.response.body += `</tbody></table>`
        break
      }
      case 'text':
        ctx.response.body += `<pre>${body.value}</pre>`
        break
      case 'json':
        ctx.response.body += `<pre>${JSON.stringify(await body.value, undefined, '  ')}</pre>`
        break
      case 'bytes':
        ctx.response.body += `<h2>Content Type: "${ctx.request.headers.get('content-type')}"</h2>`
        ctx.response.body += `<pre>${decoder.decode(await body.value)}</pre>`
        break
      default:
        ctx.response.body += `<p><strong>Body is Undefined</strong></p>`
    }
    ctx.response.body += `</body></html>`
  } else {
    ctx.response.body = `<!DOCTYPE html><html><body><h1>No Body</h1></body></html>`
  }
})

// Handle fetch events
addEventListener('fetch', app.fetchEventHandler())
