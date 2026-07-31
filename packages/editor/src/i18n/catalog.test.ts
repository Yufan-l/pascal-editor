import { expect, test } from 'bun:test'
import { editorMessages } from './messages'
import { editorZhCN } from './zh-CN'

test('the editor catalog has one translation for every unique message ID', () => {
  const messageIds = Object.values(editorMessages).map((message) => message.id)

  expect(new Set(messageIds).size).toBe(messageIds.length)
  expect(Object.keys(editorZhCN).sort()).toEqual(messageIds.sort())
})
