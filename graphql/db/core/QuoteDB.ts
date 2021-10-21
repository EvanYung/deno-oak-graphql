import type { Quote, Author } from 'types/schema.d.ts'
import QuoteDB, { FindParameters, CountParameters } from '../types/quote.d.ts'
import { isNullOrUnDef } from 'utils/is.ts'
import QuoteModel from '../models/Quote.ts'

export default class QuoteDenoDB implements QuoteDB {
  public async get(id: number): Promise<Quote> {
    const quote = (await QuoteModel.where('id', id).first()) as unknown as Quote
    return quote
  }

  public async author(id: number): Promise<Author> {
    const author = (await QuoteModel.where('id', id).author()) as unknown as Author
    return author
  }

  public async find(params: FindParameters): Promise<Quote[]> {
    const { size, page, authorId, query } = params

    const queryBuilder = QuoteModel

    if (!isNullOrUnDef(authorId)) {
      queryBuilder.where('authorId', authorId)
    }

    if (!isNullOrUnDef(query)) {
      queryBuilder.where('text', 'like', query)
    }

    const quotes = (await queryBuilder
      .offset(page * size)
      .limit(size)
      .all()) as unknown as Quote[]

    return quotes
  }

  public async count(params: CountParameters): Promise<number> {
    const { authorId, query } = params
    const queryBuilder = QuoteModel

    if (!isNullOrUnDef(authorId)) {
      queryBuilder.where('authorId', authorId)
    }

    if (!isNullOrUnDef(query)) {
      queryBuilder.where('text', 'like', query)
    }

    const count = await queryBuilder.count()

    return count
  }
}
