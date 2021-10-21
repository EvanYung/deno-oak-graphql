import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'deps'
import type { IObj } from 'types/mod.d.ts'
import author from './author.ts'
import Context from '../../context/types.d.ts'
import { datetime, BufferNode } from 'deps'
import { Quote, Author } from 'types/schema.d.ts'

const quote = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'Globally unique ID of the quote',
      resolve: (obj: Quote): string => {
        return BufferNode.from(`quote-${obj.id}`).toString('base64')
      }
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'Database ID of the quote',
      resolve: (obj: Quote): number => {
        return obj.id
      }
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
      description: '',
      resolve: (obj: Quote): string => {
        return obj.text
      }
    },
    author: {
      type: author,
      description: 'Author of the quote',
      resolve: (obj: Quote, _args: IObj, context: Context): Promise<Author> => {
        return context.db.quote.author(obj.id)
      }
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      description: '',
      resolve: (obj: Quote): string => {
        return datetime.format(new Date(obj.createdAt), 'yyyy-MM-dd HH:mm:ss')
      }
    }
  })
})

export default quote
