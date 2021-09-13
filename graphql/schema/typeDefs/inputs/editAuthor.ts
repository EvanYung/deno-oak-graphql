import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'deps'

const editAuthor = new GraphQLInputObjectType({
  name: 'EditAuthor',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})

export default editAuthor
