import type { DataLoader } from 'deps'
import type AuthorRepository from '../repositories/types/author.d.ts'
import type QuoteRepository from '../repositories/types/quote.d.ts'
import type { Author } from 'types/schema.d.ts'

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
