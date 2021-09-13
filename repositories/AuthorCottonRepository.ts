import AuthorRepository, { CreateParameters, FindParameters, CountParameters } from './AuthorRepository.ts'
import database from '../database.ts'
import { Q, OrderDirection } from 'deps'
import { IObj } from 'types/mod.d.ts'
import { Author } from 'types/schema.d.ts'

export default class AuthorCottonRepository implements AuthorRepository {
  public async get(id: number): Promise<Author> {
    const authors = (await database.table('author').where('id', id).first().execute()) as unknown as Author[]
    const author = authors?.[0] || null
    return author
  }

  public async getMany(ids: number[]): Promise<Author[]> {
    const authors = (await database.table('author').where('id', Q.in(ids)).execute()) as unknown as Author[]
    return authors
  }

  public async find(params: FindParameters): Promise<Author[]> {
    const { first, after, firstName, lastName, orderBy } = params

    const queryBuilder = database.table('author').limit(first)

    if (typeof after !== 'undefined' && after !== null) {
      queryBuilder.offset(after)
    }

    if (typeof firstName !== 'undefined' && firstName !== null) {
      queryBuilder.where('firstName', Q.like(`%${firstName}%`))
    }

    if (typeof lastName !== 'undefined' && lastName !== null) {
      queryBuilder.where('lastName', Q.like(`%${lastName}%`))
    }

    if (Array.isArray(orderBy)) {
      orderBy.forEach((ob) => queryBuilder.order(ob.field, ob.direction as OrderDirection))
    }
    const authors = (await queryBuilder.execute()) as unknown as Author[]
    return authors
  }

  public async count(params: CountParameters): Promise<number> {
    const { firstName, lastName } = params

    const queryBuilder = database.table('author').count('id', 'count')

    if (typeof firstName !== 'undefined' && firstName !== null) {
      queryBuilder.where('firstName', Q.like(`%${firstName}%`))
    }

    if (typeof lastName !== 'undefined' && lastName !== null) {
      queryBuilder.where('lastName', Q.like(`%${lastName}%`))
    }
    const ret = (await queryBuilder.first().execute()) as unknown as { count: number }[]
    const count = ret?.[0].count
    return count
  }

  public async create(params: CreateParameters): Promise<Author> {
    const ids = (await database
      .table('author')
      .insert({
        firstName: params.firstName,
        lastName: params.lastName
      })
      .execute()) as unknown as number[]
    const author = await this.get(ids[0])
    return author
  }

  public async update(id: number, firstName: string, lastName: string): Promise<Author> {
    const queryBuilder = database.table('author').where('id', id)
    if (typeof firstName !== 'undefined' && firstName !== null) {
      queryBuilder.update({ firstName: firstName })
    }

    if (typeof lastName !== 'undefined' && lastName !== null) {
      queryBuilder.update({ lastName: lastName })
    }
    const updatedRows: IObj = await queryBuilder.execute()
    if (updatedRows.length === 0) {
      throw new Error('Author not found!')
    }
    const author = this.get(id)
    return author
  }

  public async delete(id: number): Promise<Author> {
    const author = await this.get(id)

    await database.table('author').where('id', id).delete().execute()

    return author
  }
}
