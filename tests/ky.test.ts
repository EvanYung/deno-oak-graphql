#!/usr/bin/env deno test --allow-all test.ts

import { assertObjectMatch } from 'https://deno.land/std@0.100.0/testing/asserts.ts'
import KY from '../utils/ky.ts'
import { responseBody } from '../types/mod.d.ts'

const { test } = Deno

test('Test KY Fetch', async () => {
  try {
    const parsed: responseBody = await KY.post('api/sendToken', {
      json: { account: 'zltc_iZXRtZToqKXTvydkRmeWZEdW2g6mEBExk', amount: 100 }
    }).json()
    assertObjectMatch(parsed, { code: 0, message: '充值成功' })
  } catch (err) {
    throw err.message
  }
})
