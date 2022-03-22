// deno-lint-ignore-file no-explicit-any
import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } from 'deps'
import { datetime } from 'deps'
import type Context from '../../context/types.d.ts'
import quoteConnection from './connections/quoteConnection.ts'
import nodesToEdges from '../queries/tools/nodesToEdges.ts'
import toConnection from '../queries/tools/toConnection.ts'
import { Author } from 'types/schema.d.ts'

const author = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'Database ID of the author',
      resolve: (obj: Author): number => {
        return obj.id
      }
    },
    firstName: {
      type: GraphQLNonNull(GraphQLString),
      description: "Author's first name",
      resolve: (obj: Author): string => {
        return obj.firstName
      }
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
      description: "Author's last name",
      resolve: (obj: Author): string => {
        return obj.lastName
      }
    },
    quotes: {
      type: quoteConnection,
      args: {
        size: {
          defaultValue: 10,
          description: 'Limits the number of results returned in the page. Defaults to 10.',
          type: GraphQLInt
        },
        page: {
          defaultValue: 0,
          description: 'The cursor value of an item returned in previous page. An alternative to in integer offset.',
          type: GraphQLInt
        },
        query: {
          type: GraphQLString
        }
      },
      resolve: async (obj: Author, args: any, context: Context): Promise<any> => {
        const page = Math.max(args.page || 1, 1) - 1

        const quotes = await context.db.quote.find({
          size: args.size,
          page,
          authorId: obj.id,
          query: args.query
        })

        const quotesCount = await context.db.quote.count({
          authorId: obj.id,
          query: args.query
        })

        const edges = nodesToEdges(quotes, page)
        
        return toConnection(edges, quotesCount)
      }
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      description: '',
      resolve: (obj: Author): string => {
        return datetime.format(new Date(obj.createdAt), 'yyyy-MM-dd HH:mm:ss')
      }
    }
  })
})
export default author
