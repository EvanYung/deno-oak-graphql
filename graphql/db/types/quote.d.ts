import type { Quote, Author } from 'types/schema.d.ts'

export interface FindParameters {
  page: number
  size: number
  authorId?: number
  query?: string
}

export interface CountParameters {
  authorId?: number
  query?: string
}

export default interface AuthorDB {
  get(id: number): Promise<Quote>

  author(id: number): Promise<Author>

  find(params: FindParameters): Promise<Quote[]>

  count(params: CountParameters): Promise<number>
}
