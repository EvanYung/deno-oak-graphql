// deno-lint-ignore-file no-explicit-any
import { GraphQLNonNull, GraphQLBoolean } from 'deps'
import type Context from '../../context/types.d.ts'
import editAuthor from '../typeDefs/inputs/editAuthor.ts'

const updateAuthor = {
  type: GraphQLBoolean,
  args: {
    input: {
      type: GraphQLNonNull(editAuthor)
    }
  },
  resolve: (_: any, { input }: any, context: Context): Promise<any> => {
    return context.db.author.update(input)
  }
}

export default updateAuthor
