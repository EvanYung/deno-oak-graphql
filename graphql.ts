// deno-lint-ignore-file
import { applyGraphQL, gql, GQLError } from 'https://deno.land/x/oak_graphql@0.6.2/mod.ts'
import { Router, RouterContext } from './deps.ts'

const types = gql`
  type User {
    firstName: String
    lastName: String
  }

  input UserInput {
    firstName: String
    lastName: String
  }

  type ResolveType {
    done: Boolean
  }

  type Query {
    getUser(id: String): User
  }

  type Mutation {
    setUser(input: UserInput!): ResolveType!
  }
`

const resolvers = {
  Query: {
    getUser: (parent: any, { id }: any, context: any, info: any) => {
      console.log('id', id, context)
      if (context.user === 'Aaron') {
        throw new GQLError({ type: 'auth error in context' })
      }
      return {
        firstName: `wooseok-${id}`,
        lastName: 'lee'
      }
    }
  },
  Mutation: {
    setUser: (parent: any, { input: { firstName, lastName } }: any, context: any, info: any) => {
      console.log('input:', firstName, lastName)
      return {
        done: true
      }
    }
  }
}

export const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    // console.log(ctx.request.headers)
    return { user: 'Aaron2' }
  }
})
