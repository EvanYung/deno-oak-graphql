// deno-lint-ignore-file no-explicit-any
import { GraphQLInt, GraphQLString } from 'deps'
import { BufferNode } from 'deps'
import type Context from 'context/Context.ts'
import quoteConnection from '../typeDefs/connections/quoteConnection.ts'
import nodesToEdges from './nodesToEdges.ts'
import toConnection from './toConnection.ts'

interface QuotesQueryArguments {
  first: number
  after: string
  query: string
}

export default {
  type: quoteConnection,
  args: {
    first: {
      defaultValue: 10,
      description: 'Limits the number of results returned in the page. Defaults to 10.',
      type: GraphQLInt
    },
    after: {
      defaultValue: 'Y3Vyc29yMA==', // base64encode('cursor0')
      description: 'The cursor value of an item returned in previous page. An alternative to in integer offset.',
      type: GraphQLString
    },
    query: {
      type: GraphQLString
    }
  },
  resolve: async (_: any, args: QuotesQueryArguments, context: Context) => {
    const after =
      typeof args.after === 'undefined' || args.after === null
        ? 0
        : parseInt(BufferNode.from(args.after, 'base64').toString('ascii').replace('cursor', ''), 10)
    const quotes = await context.repositories.quote.find({
      first: args.first,
      after,
      query: args.query
    })
    const quotesCount = await context.repositories.quote.count({
      query: args.query
    })
    const edges = nodesToEdges(quotes, after)
    return toConnection(edges, quotesCount, edges.length === args.first, after > 0)
  }
}
