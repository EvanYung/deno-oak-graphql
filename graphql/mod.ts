import { applyGraphQL } from '../middlewares/applyGraphQL.ts'
import { Router, RouterContext } from '../deps.ts'
import schema from './schema/mod.ts'
import context from './context/mod.ts'
export const GraphQLService = await applyGraphQL<Router>({
  Router,
  schema,
  context: (_ctx: RouterContext) => {
    // console.log(ctx.request.headers)
    return context
  }
})
