import { helpers, RouterContext } from '../deps.ts'

import { object, string, number, assert } from '../deps.ts'

import { responseBody } from '../types/mod.d.ts'

const { getQuery } = helpers

/**
 * 获取余额
 * @param account 用户账户地址
 */
export const getBalance = (ctx: RouterContext) => {
  const body: responseBody = {
    code: 0,
    message: '查询成功',
    data: null
  }

  const para = getQuery(ctx)

  const Para = object({
    account: string()
  })

  try {
    assert(para, Para)
    body.data = 1000
  } catch (err) {
    body.code = err.code || 1
    body.message = err.message
  }

  ctx.response.body = body
}

/**
 * 充值token
 * @param account 用户账户地址
 * @param amount token数量
 */
export const sendToken = async (ctx: RouterContext) => {
  const body: responseBody = {
    code: 0,
    message: '充值成功',
    data: null
  }

  const para = await ctx.request.body().value

  const Para = object({
    account: string(),
    amount: number()
  })

  try {
    assert(para, Para)
    body.data = 1000
  } catch (err) {
    body.code = err.code || 1
    body.message = err.message
  }

  ctx.response.body = body
}
