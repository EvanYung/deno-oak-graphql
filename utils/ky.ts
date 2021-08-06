// deno run --allow-net ky.ts

import ky, { HTTPError } from 'https://cdn.skypack.dev/ky?dts'
import { getErrorStatusMessage } from './mod.ts'

const KY = ky.extend({
  prefixUrl: 'http://localhost:8000/deno',
  throwHttpErrors: false,
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [403]
  },
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('X-Requested-With', 'ky')
        request.headers.set('access-key-id', 'test')
      }
    ],
    afterResponse: [
      (_request, _options, response) => {
        const { status } = response
        if (status !== 200) {
          const errMsg = getErrorStatusMessage(status)!
          const error = new HTTPError(response, _request, _options)
          error.message = errMsg
          throw error
        }
      },
      async (_request, _options, response) => {
        const { code, message } = await response.json()
        if (code !== 0) {
          const error = new HTTPError(response, _request, _options)
          error.message = message
          Object.assign(error, { code })
          throw error
        }
      }
    ]
  }
})

export default KY
