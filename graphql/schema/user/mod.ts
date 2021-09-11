import { gql, path } from '../../../deps.ts'
export { resolvers } from './resolvers.ts'

const __dirname = path.dirname(path.fromFileUrl(import.meta.url))
const schema = await Deno.readTextFile(path.resolve(__dirname, './schema.graphql'))
export const types = gql`
  ${schema}
`
