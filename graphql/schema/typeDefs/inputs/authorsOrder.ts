import { GraphQLInputObjectType, GraphQLNonNull } from 'deps'
import authorsOrderField from '../enums/authorsOrderField.ts'
import direction from '../enums/direction.ts'

const authorsOrder = new GraphQLInputObjectType({
  name: 'AuthorsOrder',
  fields: {
    field: {
      type: new GraphQLNonNull(authorsOrderField)
    },
    direction: {
      type: new GraphQLNonNull(direction)
    }
  }
})

export default authorsOrder
