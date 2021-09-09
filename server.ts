import app from './app.ts'
import { colors } from './deps.ts'

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(`Listening on: ${colors.green(`${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port}`)}`)
})

await app.listen({ hostname: '127.0.0.1', port: 8001 })
