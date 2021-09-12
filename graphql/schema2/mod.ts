import * as User from './user/mod.ts'
import * as Message from './message/mod.ts'

export const typeDefs = [User.typeDefs, Message.typeDefs]
export const resolvers = [User.resolvers, Message.resolvers]
