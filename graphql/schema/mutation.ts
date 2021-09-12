import { GraphQLObjectType } from '../../deps.ts'
import createAuthor from './mutations/createAuthor.ts'
import deleteAuthor from './mutations/deleteAuthor.ts'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  // deno-lint-ignore no-explicit-any
  fields: (): any => ({
    createAuthor,
    deleteAuthor
  })
})

export default mutation
