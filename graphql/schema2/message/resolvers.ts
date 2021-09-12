// deno-lint-ignore-file
import { GQLError } from 'deps'
export const resolvers = {
  Query: {
    getMessage: (_parent: any, { id }: any, context: any, _info: any) => {
      console.log('id', id, context)
      if (context.user === 'Aaron') {
        throw new GQLError({ type: 'auth error in context' })
      }
      return {
        id: `${id}`,
        text: 'leexxx'
      }
    },
    getAllMessages: (_parent: any, _: any, context: any, _info: any) => {
      return [
        {
          id: '1',
          text: 'aaa'
        },
        {
          id: '2',
          text: 'bbb'
        }
      ]
    }
  },
  Mutation: {
    addMessage: (_parent: any, { input: { id, text } }: any, _context: any, _info: any) => {
      console.log('input:', id, text)
      return {
        done: true,
        id: 'xxx'
      }
    }
  }
}
