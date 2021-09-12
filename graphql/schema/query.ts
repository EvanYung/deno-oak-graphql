import { GraphQLObjectType } from '../../deps.ts'
import author from './queries/author.ts'
import authors from './queries/authors.ts'
import quote from './queries/quote.ts'
import quotes from './queries/quotes.ts'

const query = new GraphQLObjectType({
  name: 'Query',
  // deno-lint-ignore no-explicit-any
  fields: (): any => ({
    author,
    authors,
    quote,
    quotes
  })
})

export default query
