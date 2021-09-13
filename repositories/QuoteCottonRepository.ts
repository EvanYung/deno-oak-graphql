import QuoteRepository, { FindParameters, CountParameters } from './QuoteRepository.ts'
import database from '../database.ts'
import { Quote } from 'types/schema.d.ts'
import { Q } from 'deps'
import { isNullOrUnDef } from 'utils/is.ts'

export default class QuoteCottonRepository implements QuoteRepository {
  public async get(id: number): Promise<Quote> {
    const quotes = (await database.table('quote').where('id', id).first().execute()) as unknown as Quote[]
    const quote = quotes?.[0] || null
    return quote
  }

  public async find(params: FindParameters): Promise<Quote[]> {
    const { size, page, authorId, query } = params

    const queryBuilder = database.table('quote')

    if (!isNullOrUnDef(authorId)) {
      queryBuilder.where('authorId', authorId)
    }

    if (!isNullOrUnDef(query)) {
      queryBuilder.where('text', Q.like(`%${query}%`))
    }
    const quotes = (await queryBuilder
      .offset(page * size)
      .limit(size)
      .execute()) as unknown as Quote[]
    return quotes
  }

  public async count(params: CountParameters): Promise<number> {
    const { authorId, query } = params
    const queryBuilder = database.table('quote').count('id', 'count')

    if (!isNullOrUnDef(authorId)) {
      queryBuilder.where('authorId', authorId)
    }

    if (!isNullOrUnDef(query)) {
      queryBuilder.where('text', Q.like(`%${query}%`))
    }

    const ret = (await queryBuilder.first().execute()) as unknown as { count: number }[]
    const count = ret?.[0].count
    return count
  }
}
