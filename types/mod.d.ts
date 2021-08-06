// deno-lint-ignore-file no-explicit-any

export interface Fn<T = any> {
  (...arg: T[]): T
}

export interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

// 任意对象
export interface IObj<T = any> {
  [key: string]: T
  [key: number]: T
}

export type Dictionary<T = any> = Record<string, T>

export type Nullable<T = any> = T | null

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export interface responseBody {
  code: number
  message: string
  [key: string]: any
}
