import { applyGraphQL } from '../deps.ts'
import { Router, RouterContext } from '../deps.ts'
import { types, resolvers } from './schema/user/mod.ts'

export const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: [types],
  resolvers: [resolvers],
  context: (_ctx: RouterContext) => {
    // console.log(ctx.request.headers)
    return { user: 'Aaron2' }
  }
})
