import Context from './Context.ts'
import AuthorRepository from '../repositories/AuthorCottonRepository.ts'
import QuoteRepository from '../repositories/QuoteCottonRepository.ts'
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
