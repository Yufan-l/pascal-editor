import { expect, test } from 'bun:test'
import { appMessages } from './messages'
import { appZhCN } from './zh-CN'

test('the app catalog has one translation for every unique message ID', () => {
  const messageIds = Object.values(appMessages).map((message) => message.id)

  expect(new Set(messageIds).size).toBe(messageIds.length)
  expect(Object.keys(appZhCN).sort()).toEqual(messageIds.sort())
})
