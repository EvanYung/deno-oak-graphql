import { Router } from 'deps'
const router = new Router()

import * as apiList from '../controllers/mod.ts'

for (const [name, func] of Object.entries(apiList)) {
  // get开头api为get方法
  const methods = (name.startsWith('get') ? 'get' : 'post') as 'get'
  router[methods](`/api/${name}`, func)
}

export default router
