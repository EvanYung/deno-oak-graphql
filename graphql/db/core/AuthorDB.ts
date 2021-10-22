import { Author } from 'types/schema.d.ts'
import AuthorDB, { CreateParameters, FindParameters, CountParameters } from '../types/author.d.ts'
import { isNullOrUnDef, isUnDef } from 'utils/is.ts'
import { omitPlus } from 'utils/mod.ts'

import AuthorModle from '../models/Author.ts'

export default class AuthorDenoDB implements AuthorDB {
  public async get(id: number): Promise<Author> {
    const author = (await AuthorModle.where('id', id).first()) as unknown as Author

    return author
  }

  public async find(params: FindParameters<keyof Author>): Promise<Author[]> {
    const { size, page, firstName, lastName, orderBy } = params

    const queryBuilder = AuthorModle.limit(size)

    if (!isNullOrUnDef(firstName)) {
      queryBuilder.where('firstName', 'like', firstName)
    }

    if (!isNullOrUnDef(lastName)) {
      queryBuilder.where('lastName', 'like', lastName)
    }

    if (Array.isArray(orderBy)) {
      orderBy.forEach((ob) => queryBuilder.orderBy(ob.field, ob.direction))
    }
    const authors = (await queryBuilder
      .offset(page * size)
      .limit(size)
      .all()) as unknown as Author[]

    return authors
  }

  public async count(params: CountParameters): Promise<number> {
    const { firstName, lastName } = params

    const queryBuilder = AuthorModle

    if (!isNullOrUnDef(firstName)) {
      queryBuilder.where('firstName', 'like', firstName)
    }

    if (!isNullOrUnDef(lastName)) {
      queryBuilder.where('lastName', 'like', lastName)
    }

    const count = await queryBuilder.count()

    return count
  }

  public async create(params: CreateParameters): Promise<number> {
    const { firstName, lastName } = params

    const authorModel = new AuthorModle()

    authorModel.firstName = firstName
    authorModel.lastName = lastName

    const { lastInsertId: id } = await authorModel.save()
    return id as number
  }

  public async update(params: CreateParameters & { id: number }): Promise<boolean> {
    const { id } = params

    const authorModel = await AuthorModle.where('id', id).first()

    if (!authorModel) {
      throw new Error('Author not found!')
    }

    const queryUpdate = omitPlus(params, 'id', isUnDef)

    Object.assign(authorModel, queryUpdate)

    await authorModel.update()

    return true
  }

  public async delete(id: number): Promise<boolean> {
    const authorModel = await AuthorModle.where('id', id).first()

    if (!authorModel) {
      throw new Error('Author not found!')
    }

    await authorModel.delete()

    return true
  }
}
