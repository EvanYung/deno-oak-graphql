// deno-lint-ignore-file no-explicit-any
import { GraphQLNonNull, GraphQLID } from 'deps'
import type Context from '../../context/types.d.ts'
import newAuthor from '../typeDefs/inputs/newAuthor.ts'

const createAuthor = {
  type: GraphQLID,
  args: {
    input: {
      type: GraphQLNonNull(newAuthor)
    }
  },
  resolve: (_: any, { input }: any, context: Context): Promise<any> => {
    return context.db.author.create(input)
  }
}

export default createAuthor
