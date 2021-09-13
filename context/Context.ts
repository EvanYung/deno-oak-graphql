import { DataLoader } from 'deps'
import AuthorRepository from '../repositories/AuthorRepository.ts'
import QuoteRepository from '../repositories/QuoteRepository.ts'
import { Author } from 'types/schema.d.ts'

interface RepositoriesContext {
  author: AuthorRepository
  quote: QuoteRepository
}

interface LoadersContext {
  author: DataLoader<number, Author>
}

export default interface Context {
  repositories: RepositoriesContext
  loaders: LoadersContext
}
