// deno-lint-ignore-file
import { GQLError } from 'deps'
export const resolvers = {
  Query: {
    getUser: (_parent: any, { id }: any, context: any, _info: any) => {
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
    setUser: (_parent: any, { input: { firstName, lastName } }: any, _context: any, _info: any) => {
      console.log('input:', firstName, lastName)
      return {
        done: true,
        id: 'xxx'
      }
    }
  }
}
