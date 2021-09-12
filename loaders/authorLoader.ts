import DataLoader, { BatchLoadFn } from 'https://cdn.skypack.dev/dataloader?dts'
import AuthorRepository from '../repositories/AuthorKnexRepository.ts'
import { Author } from '../graphql/types/mod.d.ts'

async function getAuthorsById(ids: number[]): Promise<Author[]> {
  const authorRepository = new AuthorRepository()
  const authors = await authorRepository.getMany(ids)
  return ids.map((id) => {
    return authors.find((author) => author.id === id)!
  })
}

export default new DataLoader(getAuthorsById as unknown as BatchLoadFn<number, Author>)
