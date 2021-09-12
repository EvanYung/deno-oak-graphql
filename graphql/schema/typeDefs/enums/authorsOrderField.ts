import { GraphQLEnumType } from 'deps'

export default new GraphQLEnumType({
  name: 'AuthorsOrderField',
  values: {
    ID: {
      value: 'id'
    },
    CREATED_AT: {
      value: 'createdAt'
    }
  }
})
