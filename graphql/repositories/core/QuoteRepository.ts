import { Q } from 'deps'
import type { Quote } from 'types/schema.d.ts'
import QuoteRepository, { FindParameters, CountParameters } from '../types/quote.d.ts'
import { isNullOrUnDef } from 'utils/is.ts'
import QuoteModel from '../models/Quote.ts'

export default class QuoteCottonRepository implements QuoteRepository {
  public async get(id: number): Promise<Quote> {
    const quote = (await QuoteModel.query().where('id', id).first()) as unknown as Quote
    return quote
  }

  public async find(params: FindParameters): Promise<Quote[]> {
    const { size, page, authorId, query } = params

    const queryBuilder = QuoteModel.query()

    if (!isNullOrUnDef(authorId)) {
      queryBuilder.where('authorId', authorId)
    }

    if (!isNullOrUnDef(query)) {
      queryBuilder.where('text', Q.like(`%${query}%`))
    }

    const quotes = (await queryBuilder
      .offset(page * size)
      .limit(size)
      .all()) as unknown as Quote[]

    return quotes
  }

  public async count(params: CountParameters): Promise<number> {
    const { authorId, query } = params
    const queryBuilder = QuoteModel.query()

    if (!isNullOrUnDef(authorId)) {
      queryBuilder.where('authorId', authorId)
    }

    if (!isNullOrUnDef(query)) {
      queryBuilder.where('text', Q.like(`%${query}%`))
    }

    const count = await queryBuilder.count()

    return count
  }
}
