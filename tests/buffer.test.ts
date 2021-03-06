#!/usr/bin/env deno test --allow-all buffer.ts

import { Buffer } from '../deps.ts'
import { assertEquals } from '../dev_deps.ts'
import { BufferReader } from '../utils/buffer_reader/mod.ts'

const { test } = Deno
const encoder = new TextEncoder()
const decoder = new TextDecoder()

test({
  name: 'testBufferReaderMinSize',
  async fn(): Promise<void> {
    const strList = ['', 'hello', 'world', '!', '', '']
    const str = strList.join(`\r\n`)
    const stream = encoder.encode(str)
    const buf = new Buffer(stream)
    const bufReader: BufferReader = new BufferReader(buf, 4)
    let readLineIndex = 0
    while (!bufReader.isFinished()) {
      const line = await bufReader.readLine()
      assertEquals(line, strList[readLineIndex])
      readLineIndex++
    }
  }
})

test({
  name: 'testBufferReaderMaxSize',
  async fn(): Promise<void> {
    const strList = ['', 'hello', 'world', '!', '', '']
    const str = strList.join(`\r\n`)
    const stream = encoder.encode(str)
    const buf = new Buffer(stream)
    const bufReader: BufferReader = new BufferReader(buf, 4096)
    let readLineIndex = 0
    while (!bufReader.isFinished()) {
      const line = await bufReader.readLine()
      assertEquals(line, strList[readLineIndex])
      readLineIndex++
    }
  }
})

test({
  name: 'testBufferReaderCustomSize',
  async fn(): Promise<void> {
    const strList = ['\r\n', 'hello', '\r\n', 'world', '\r\n', '!', '\r\n', 'ha!']
    const str = strList.join('')
    const stream = encoder.encode(str)
    const buf = new Buffer(stream)
    const bufReader: BufferReader = new BufferReader(buf, 4096)
    const line1 = await bufReader.readLine()
    assertEquals(line1, '')
    const line2 = await bufReader.readLine()
    assertEquals(line2, 'hello')
    const customChunk = await bufReader.readCustomChunk(8)
    const customStr = decoder.decode(customChunk)
    assertEquals(customStr, 'world\r\n!')
  }
})
