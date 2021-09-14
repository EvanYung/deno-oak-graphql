import { Q } from 'deps'
import { Author } from 'types/schema.d.ts'
import AuthorRepository, { CreateParameters, FindParameters, CountParameters } from '../types/author.d.ts'
import { isNullOrUnDef, isUnDef } from 'utils/is.ts'
import { omitPlus } from 'utils/mod.ts'

import AuthorModle from '../models/Author.ts'

export default class AuthorCottonRepository implements AuthorRepository {
  public async get(id: number): Promise<Author> {
    const author = (await AuthorModle.query().where('id', id).first()) as unknown as Author

    return author
  }

  public async getMany(ids: number[]): Promise<Author[]> {
    const authors = (await AuthorModle.query().where('id', Q.in(ids)).all()) as unknown as Author[]

    return authors
  }

  public async find(params: FindParameters<keyof Author>): Promise<Author[]> {
    const { size, page, firstName, lastName, orderBy } = params

    const queryBuilder = AuthorModle.query().limit(size)

    if (!isNullOrUnDef(firstName)) {
      queryBuilder.where('firstName', Q.like(`%${firstName}%`))
    }

    if (!isNullOrUnDef(lastName)) {
      queryBuilder.where('lastName', Q.like(`%${lastName}%`))
    }

    if (Array.isArray(orderBy)) {
      orderBy.forEach((ob) => queryBuilder.order(ob.field, ob.direction))
    }
    const authors = (await queryBuilder
      .offset(page * size)
      .limit(size)
      .all()) as unknown as Author[]

    return authors
  }

  public async count(params: CountParameters): Promise<number> {
    const { firstName, lastName } = params

    const queryBuilder = AuthorModle.query()

    if (!isNullOrUnDef(firstName)) {
      queryBuilder.where('firstName', Q.like(`%${firstName}%`))
    }

    if (!isNullOrUnDef(lastName)) {
      queryBuilder.where('lastName', Q.like(`%${lastName}%`))
    }

    const count = await queryBuilder.count()

    return count
  }

  public async create(params: CreateParameters): Promise<Author> {
    const { firstName, lastName } = params

    const authorModel = new AuthorModle()

    authorModel.firstName = firstName
    authorModel.lastName = lastName

    const author = (await authorModel.save()) as unknown as Author

    return author
  }

  public async update(params: CreateParameters & { id: number }): Promise<Author> {
    const { id } = params

    const authorModel = await AuthorModle.query().where('id', id).first()

    if (!authorModel) {
      throw new Error('Author not found!')
    }
    const queryUpdate = omitPlus(params, 'id', isUnDef)

    Object.assign(authorModel, queryUpdate)

    const author = (await authorModel.save()) as unknown as Author

    return author
  }

  public async delete(id: number): Promise<Author> {
    const authorModel = await AuthorModle.query().where('id', id).first()

    if (!authorModel) {
      throw new Error('Author not found!')
    }

    const author = (await authorModel.remove()) as unknown as Author

    return author
  }
}
