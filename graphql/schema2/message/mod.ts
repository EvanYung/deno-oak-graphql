import { gql, path } from 'deps'
export { resolvers } from './resolvers.ts'

const __dirname = path.dirname(path.fromFileUrl(import.meta.url))
const schema = await Deno.readTextFile(path.resolve(__dirname, './schema.graphql'))
export const typeDefs = gql`
  ${schema}
`
