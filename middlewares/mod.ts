import { Middleware, send } from '../deps.ts'
import { colors } from '../deps.ts'
import { responseBody } from '../types/mod.d.ts'

export const Logger: Middleware = async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get('X-Response-Time')!
  const { method, url } = ctx.request
  const { status } = ctx.response
  const color = status === 200 ? 'green' : 'red'
  console.log(
    `${colors.bold(colors.green(method))} ${colors[color](status as unknown as string)} ${url} - ${colors.blue(rt)}`
  )
}

export const Timing: Middleware = async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${ms}ms`)
}

export const Static: Middleware = async (ctx, next) => {
  try {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/static`,
      index: 'index.html'
    })
  } catch (_err) {
    await next()
  }
}

export const ErrorCatcher: Middleware = async (ctx, next) => {
  try {
    await next()
    const { code, message } = (ctx.response.body || {}) as responseBody
    code && code !== 0 && console.log('error:', message)
  } catch (err) {
    const { status, message } = err
    console.log('error:', message)
    ctx.response.status = status
    ctx.response.body = {
      code: status,
      message: err.message
    }
  }
}
