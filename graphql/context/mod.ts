import type Context from './types.d.ts'
import AuthorRepository from '../repositories/core/AuthorRepository.ts'
import QuoteRepository from '../repositories/core/QuoteRepository.ts'
import authorLoader from '../loaders/authorLoader.ts'

const context: Context = {
  repositories: {
    author: new AuthorRepository(),
    quote: new QuoteRepository()
  },
  loaders: {
    author: authorLoader
  }
}

export default context
