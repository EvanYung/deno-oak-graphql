// deno-lint-ignore-file no-explicit-any
import { GraphQLInt, GraphQLString, GraphQLList } from 'deps'
import type Context from '../../context/types.d.ts'
import authorConnection from '../typeDefs/connections/authorConnection.ts'
import authorsOrder from '../typeDefs/inputs/authorsOrder.ts'
import nodesToEdges from './tools/nodesToEdges.ts'
import toConnection from './tools/toConnection.ts'

interface AuthorsQueryArguments {
  size: number
  page: number
  firstName: string
  lastName: string
  orderBy: any[]
}

export default {
  type: authorConnection,
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
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    orderBy: {
      type: GraphQLList(authorsOrder)
    }
  },
  resolve: async (_: any, args: AuthorsQueryArguments, context: Context) => {
    const page = Math.max(args.page || 1, 1) - 1

    const size = args.size

    const authors = await context.db.author.find({
      size,
      page,
      firstName: args.firstName,
      lastName: args.lastName,
      orderBy: args.orderBy
    })

    const authorsCount = await context.db.author.count({
      firstName: args.firstName,
      lastName: args.lastName
    })

    const edges = nodesToEdges(authors, page * size)

    return toConnection(edges, authorsCount)
  }
}
