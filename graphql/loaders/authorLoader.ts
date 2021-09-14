import { DataLoader, BatchLoadFn } from 'deps'
import AuthorRepository from '../repositories/AuthorCottonRepository.ts'
import type { Author } from 'types/schema.d.ts'

async function getAuthorsById(ids: number[]): Promise<Author[]> {
  const authorRepository = new AuthorRepository()
  const authors = await authorRepository.getMany(ids)
  return ids.map((id) => {
    return authors.find((author) => author.id === id)!
  })
}

export default new DataLoader(getAuthorsById as unknown as BatchLoadFn<number, Author>)
