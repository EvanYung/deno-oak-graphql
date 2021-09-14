import { GraphQLSchema } from 'deps'
import mutation from './mutation.ts'
import query from './query.ts'

export default new GraphQLSchema({
  mutation,
  query
})
