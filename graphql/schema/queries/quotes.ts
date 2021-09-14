// deno-lint-ignore-file no-explicit-any
import { GraphQLInt, GraphQLString } from 'deps'
import type Context from '../../context/Context.ts'
import quoteConnection from '../typeDefs/connections/quoteConnection.ts'
import nodesToEdges from './tools/nodesToEdges.ts'
import toConnection from './tools/toConnection.ts'

interface QuotesQueryArguments {
  size: number
  page: number
  query: string
}

export default {
  type: quoteConnection,
  args: {
    size: {
      defaultValue: 10,
      description: 'Limits the number of results returned in the page. Defaults to 10.',
      type: GraphQLInt
    },
    page: {
      defaultValue: 1,
      description: 'The cursor value of an item returned in previous page. An alternative to in integer offset.',
      type: GraphQLInt
    },
    query: {
      type: GraphQLString
    }
  },
  resolve: async (_: any, args: QuotesQueryArguments, context: Context) => {
    const page = Math.max(args.page || 1, 1) - 1
    const size = args.size
    const quotes = await context.repositories.quote.find({
      size,
      page,
      query: args.query
    })
    const quotesCount = await context.repositories.quote.count({
      query: args.query
    })
    const edges = nodesToEdges(quotes, page * size)
    return toConnection(edges, quotesCount)
  }
}
