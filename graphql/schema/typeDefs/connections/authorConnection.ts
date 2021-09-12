import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'deps'
import pageInfo from '../pageInfo.ts'
import authorEdge from '../edges/authorEdge.ts'

const authorConnection = new GraphQLObjectType({
  name: 'AuthorConnection',
  fields: {
    totalCount: {
      description: 'Identifies the total count of items in the connection.',
      type: GraphQLNonNull(GraphQLInt)
    },
    edges: {
      description: 'A list of edges.',
      type: new GraphQLList(authorEdge)
    },
    pageInfo: {
      type: GraphQLNonNull(pageInfo)
    }
  }
})

export default authorConnection
