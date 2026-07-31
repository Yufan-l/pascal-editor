import { describe, expect, test } from 'bun:test'
import { nodesMessages } from './messages'
import { nodesZhCN } from './zh-CN'

describe('the built-in node catalog', () => {
  test('has one translation for every unique message ID', () => {
    const ids = Object.values(nodesMessages).map((message) => message.id)

    expect(new Set(ids).size).toBe(ids.length)
    expect(Object.keys(nodesZhCN).sort()).toEqual([...ids].sort())
  })
})
