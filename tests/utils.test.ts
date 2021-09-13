#!/usr/bin/env deno test --allow-all test.ts

import { assertObjectMatch } from 'https://deno.land/std@0.100.0/testing/asserts.ts'
import { omitPlus } from '../utils/mod.ts'
import { isUnDef } from '../utils/is.ts'

const { test } = Deno

test('Test OmitPlus', () => {
  const obj = { id: 1, _id: 2, firstName: undefined, lastName: 'Yung' }
  const ret = omitPlus(obj, ['id', '_id'], isUnDef)
  assertObjectMatch(ret, { lastName: 'Yung' })
})
