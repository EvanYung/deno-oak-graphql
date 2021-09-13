import QuoteRepository, { FindParameters, CountParameters } from './QuoteRepository.ts'
import database from '../database.ts'
import { Quote } from 'types/schema.d.ts'
import { Q } from 'deps'

export default class QuoteCottonRepository implements QuoteRepository {
  public async get(id: number): Promise<Quote> {
    const quotes = (await database.table('quote').where('id', id).first().execute()) as unknown as Quote[]
    const quote = quotes?.[0] || null
    return quote
  }

  public async find(params: FindParameters): Promise<Quote[]> {
    const { first, after, authorId, query } = params

    const queryBuilder = database.table('quote').limit(first)
    if (typeof after !== 'undefined' && after !== null) {
      queryBuilder.offset(after)
    }

    if (typeof authorId !== 'undefined' && authorId !== null) {
      queryBuilder.where('authorId', authorId)
    }

    if (typeof query !== 'undefined' && query !== null) {
      queryBuilder.where('text', Q.like(`%${query}%`))
    }
    const quotes = (await queryBuilder.execute()) as unknown as Quote[]
    return quotes
  }

  public async count(params: CountParameters): Promise<number> {
    const { authorId, query } = params
    const queryBuilder = database.table('quote').count('id', 'count')

    if (typeof authorId !== 'undefined' && authorId !== null) {
      queryBuilder.where('authorId', authorId)
    }

    if (typeof query !== 'undefined' && query !== null) {
      queryBuilder.where('text', Q.like(`%${query}%`))
    }

    const ret = (await queryBuilder.first().execute()) as unknown as { count: number }[]
    const count = ret?.[0].count
    return count
  }
}
