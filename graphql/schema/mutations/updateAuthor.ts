// deno-lint-ignore-file no-explicit-any
import { GraphQLNonNull } from 'deps'
import type Context from 'context/Context.ts'
import { default as authorType } from '../typeDefs/author.ts'
import editAuthor from '../typeDefs/inputs/editAuthor.ts'

const updateAuthor = {
  type: authorType,
  args: {
    input: {
      type: GraphQLNonNull(editAuthor)
    }
  },
  resolve: (_: any, { input }: any, context: Context): Promise<any> => {
    return context.repositories.author.update(input)
  }
}

export default updateAuthor
