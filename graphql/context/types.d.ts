import type AuthorDB from '../db/types/author.d.ts'
import type QuoteDB from '../db/types/quote.d.ts'

interface DBContext {
  author: AuthorDB
  quote: QuoteDB
}

export default interface Context {
  db: DBContext
}
