import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'deps'
import pageInfo from '../pageInfo.ts'
import quoteEdge from '../edges/quoteEdge.ts'

const quoteConnection = new GraphQLObjectType({
  name: 'QuoteConnection',
  fields: {
    totalCount: {
      description: 'Identifies the total count of items in the connection.',
      type: GraphQLNonNull(GraphQLInt)
    },
    edges: {
      description: 'A list of edges.',
      type: new GraphQLList(quoteEdge)
    },
    pageInfo: {
      type: GraphQLNonNull(pageInfo)
    }
  }
})

export default quoteConnection
