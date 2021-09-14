import type { OrderDirection } from 'deps'
export type Author = {
  id: number
  firstName: string
  lastName: string
  createdAt: string
}

export type Quote = {
  id: number
  authorId: number
  text: string
  createdAt: string
}

export type OrderBy<T = string> = {
  field: T
  direction: OrderDirection
}
