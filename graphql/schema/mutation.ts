import { GraphQLObjectType } from 'deps'
import type { IObj } from 'types/mod.d.ts'
import createAuthor from './mutations/createAuthor.ts'
import deleteAuthor from './mutations/deleteAuthor.ts'
import updateAuthor from './mutations/updateAuthor.ts'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): IObj => ({
    createAuthor,
    deleteAuthor,
    updateAuthor
  })
})

export default mutation
