// deno-lint-ignore-file no-explicit-any
import { GraphQLNonNull } from 'deps'
import type Context from '../../context/types.d.ts'
import { default as authorType } from '../typeDefs/author.ts'
import newAuthor from '../typeDefs/inputs/newAuthor.ts'

const createAuthor = {
  type: authorType,
  args: {
    input: {
      type: GraphQLNonNull(newAuthor)
    }
  },
  resolve: (_: any, { input }: any, context: Context): Promise<any> => {
    return context.repositories.author.create(input)
  }
}

export default createAuthor
