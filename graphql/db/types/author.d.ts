import type { Author, OrderBy } from 'types/schema.d.ts'

export interface CreateParameters {
  firstName: string
  lastName: string
}

export interface FindParameters<T = string> {
  page: number
  size: number
  firstName?: string
  lastName?: string
  orderBy?: OrderBy<T>[]
}

export interface CountParameters {
  firstName?: string
  lastName?: string
}

export default interface AuthorDB {
  get(id: number): Promise<Author>

  create(params: CreateParameters): Promise<number>

  update(params: CreateParameters & { id: number }): Promise<boolean>

  find(params: FindParameters): Promise<Author[]>

  count(params: CountParameters): Promise<number>

  delete(id: number): Promise<boolean>
}
