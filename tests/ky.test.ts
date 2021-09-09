#!/usr/bin/env deno test --allow-all test.ts

import { assertObjectMatch } from 'https://deno.land/std@0.100.0/testing/asserts.ts'
import KY from '../utils/ky.ts'
import { responseBody } from '../types/mod.d.ts'

const { test } = Deno

test('Test KY Fetch', async () => {
  try {
    const parsed: responseBody = await KY.get('getJoke', {
      searchParams: { page: 1, count: 2, type: 'video' }
    }).json()
    console.log(parsed)
    assertObjectMatch(parsed, { code: 200, message: '成功!' })
  } catch (err) {
    throw err.message
  }
})
