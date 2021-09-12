import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } from 'deps'

const deleteAuthorInput = new GraphQLInputObjectType({
  name: 'deleteAuthorInput',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  }
})

export default deleteAuthorInput
