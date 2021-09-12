import { GraphQLObjectType, GraphQLString } from 'deps'
import author from '../author.ts'

const authorEdge = new GraphQLObjectType({
  name: 'AuthorEdge',
  description: 'List of edges.',
  fields: {
    node: {
      description: 'The item at the end of the edge.',
      type: author
    },
    cursor: {
      description: 'A cursor for pagination.',
      type: GraphQLString
    }
  }
})

export default authorEdge
