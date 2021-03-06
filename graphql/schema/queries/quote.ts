// deno-lint-ignore-file no-explicit-any
import { GraphQLID, GraphQLNonNull } from 'deps'
import { default as quoteType } from '../typeDefs/quote.ts'
import type Context from '../../context/types.d.ts'
const quote = {
  type: quoteType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (_: any, { id }: any, context: Context) => {
    return context.db.quote.get(id)
  }
}

export default quote
