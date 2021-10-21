import type Context from './types.d.ts'
import AuthorDB from '../db/core/AuthorDB.ts'
import QuoteDB from '../db/core/QuoteDB.ts'

const context: Context = {
  db: {
    author: new AuthorDB(),
    quote: new QuoteDB()
  }
}

export default context
