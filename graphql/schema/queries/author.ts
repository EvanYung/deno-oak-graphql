// deno-lint-ignore-file no-explicit-any
import { GraphQLID, GraphQLNonNull } from 'deps'
import type Context from 'context/Context.ts'
import { default as authorType } from '../typeDefs/author.ts'

const author = {
  type: authorType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (_: any, { id }: any, context: Context): Promise<any> => {
    return context.repositories.author.get(id)
  }
}

export default author
