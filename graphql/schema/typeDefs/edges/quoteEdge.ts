import { GraphQLObjectType, GraphQLInt } from 'deps'
import quote from '../quote.ts'

const quoteEdge = new GraphQLObjectType({
  name: 'QuoteEdge',
  description: 'List of edges.',
  fields: {
    node: {
      description: 'The item at the end of the edge.',
      type: quote
    },
    cursor: {
      description: 'A cursor for pagination.',
      type: GraphQLInt
    }
  }
})

export default quoteEdge
