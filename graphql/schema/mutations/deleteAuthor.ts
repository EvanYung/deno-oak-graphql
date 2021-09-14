// deno-lint-ignore-file no-explicit-any
import { GraphQLNonNull } from 'deps'
import type Context from '../../context/Context.ts'
import { default as authorType } from '../typeDefs/author.ts'
import deleteAuthorInput from '../typeDefs/inputs/deleteAuthor.ts'

const deleteAuthor = {
  type: authorType,
  args: {
    input: {
      type: GraphQLNonNull(deleteAuthorInput)
    }
  },
  resolve: (_: any, { input }: any, context: Context): Promise<any> => {
    return context.repositories.author.delete(input.id)
  }
}

export default deleteAuthor
