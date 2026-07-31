import { describe, expect, test } from 'bun:test'
import { createI18n, type MessageCatalog, resolveLocale } from './runtime'

describe('resolveLocale', () => {
  test('prefers a supported cookie over the request languages', () => {
    expect(resolveLocale('en', 'zh-CN,zh;q=0.9')).toBe('en')
  })

  test('honors quality values and Simplified Chinese language ranges', () => {
    expect(resolveLocale(null, 'en;q=0.7, zh-Hans;q=0.9')).toBe('zh-CN')
    expect(resolveLocale(null, 'zh-TW, en;q=0.8')).toBe('en')
  })

  test('falls back to English', () => {
    expect(resolveLocale('fr', 'de-DE, fr;q=0.8')).toBe('en')
  })
})

describe('createI18n', () => {
  const zhCN = {
    'test.greeting': '你好，{name}',
    'test.sceneCount': '{count} 个场景',
  } as const satisfies MessageCatalog

  test('uses a catalog and interpolates named values', () => {
    const { t } = createI18n('zh-CN', [zhCN])
    expect(t({ id: 'test.greeting', defaultMessage: 'Hello, {name}' }, { name: 'Pascal' })).toBe(
      '你好，Pascal',
    )
  })

  test('falls back to the descriptor when a translation is missing', () => {
    const { t } = createI18n('zh-CN', [zhCN])
    expect(t({ id: 'test.missing', defaultMessage: 'Missing translation' })).toBe(
      'Missing translation',
    )
  })

  test('selects English plurals and lets Chinese use one natural form', () => {
    const descriptor = {
      id: 'test.sceneCount',
      defaultMessage: {
        one: '{count} scene',
        other: '{count} scenes',
      },
    } as const

    expect(createI18n('en').tPlural(descriptor, 1)).toBe('1 scene')
    expect(createI18n('en').tPlural(descriptor, 2)).toBe('2 scenes')
    expect(createI18n('zh-CN', [zhCN]).tPlural(descriptor, 2)).toBe('2 个场景')
  })

  test('lets later catalogs override earlier catalogs', () => {
    const { t } = createI18n('zh-CN', [zhCN, { 'test.greeting': '欢迎，{name}' }])
    expect(t({ id: 'test.greeting', defaultMessage: 'Hello, {name}' }, { name: 'Pascal' })).toBe(
      '欢迎，Pascal',
    )
  })
})
