import { GraphQLObjectType } from '../../deps.ts'
import createAuthor from './mutations/createAuthor.ts'
import deleteAuthor from './mutations/deleteAuthor.ts'
import { IObj } from 'types/mod.d.ts'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): IObj => ({
    createAuthor,
    deleteAuthor
  })
})

export default mutation
