// deno-lint-ignore-file no-explicit-any
import { GraphQLNonNull, GraphQLBoolean } from 'deps'
import type Context from '../../context/types.d.ts'
import deleteAuthorInput from '../typeDefs/inputs/deleteAuthor.ts'

const deleteAuthor = {
  type: GraphQLBoolean,
  args: {
    input: {
      type: GraphQLNonNull(deleteAuthorInput)
    }
  },
  resolve: (_: any, { input }: any, context: Context): Promise<any> => {
    return context.db.author.delete(input.id)
  }
}

export default deleteAuthor
