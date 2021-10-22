import { Relationships } from 'deps'

import Author from './Author.ts'
import Quote from './Quote.ts'

Relationships.belongsTo(Quote, Author)

export default [Author, Quote]
