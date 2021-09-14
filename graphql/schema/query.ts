import { GraphQLObjectType } from 'deps'
import type { IObj } from 'types/mod.d.ts'
import author from './queries/author.ts'
import authors from './queries/authors.ts'
import quote from './queries/quote.ts'
import quotes from './queries/quotes.ts'

const query = new GraphQLObjectType({
  name: 'Query',
  fields: (): IObj => ({
    author,
    authors,
    quote,
    quotes
  })
})

export default query
