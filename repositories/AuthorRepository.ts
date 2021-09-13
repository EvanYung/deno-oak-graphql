import { Author, OrderBy } from 'types/schema.d.ts'

export interface CreateParameters {
  firstName: string
  lastName: string
}

export interface FindParameters {
  page: number
  size: number
  firstName?: string
  lastName?: string
  orderBy?: OrderBy[]
}

export interface CountParameters {
  firstName?: string
  lastName?: string
}

export default interface AuthorRepository {
  get(id: number): Promise<Author>

  getMany(ids: number[]): Promise<Author[]>

  create(params: CreateParameters): Promise<Author>

  update(params: CreateParameters & { id: number }): Promise<Author>

  find(params: FindParameters): Promise<Author[]>

  count(params: CountParameters): Promise<number>

  delete(id: number): Promise<Author>
}
