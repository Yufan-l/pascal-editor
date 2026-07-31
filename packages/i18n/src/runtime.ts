export const SUPPORTED_LOCALES = ['en', 'zh-CN'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export type MessageValues = Readonly<Record<string, string | number>>

export type MessageDescriptor = Readonly<{
  id: string
  defaultMessage: string
}>

export type PluralMessageDescriptor = Readonly<{
  id: string
  defaultMessage: Readonly<{
    one: string
    other: string
  }>
}>

export type CatalogMessage =
  | string
  | Readonly<{
      one?: string
      other: string
    }>

export type MessageCatalog = Readonly<Record<string, CatalogMessage>>

export type LocaleCatalogs = Readonly<Partial<Record<SupportedLocale, readonly MessageCatalog[]>>>

export type MessageCatalogFor<
  Messages extends Readonly<Record<string, MessageDescriptor | PluralMessageDescriptor>>,
> = Readonly<Record<Messages[keyof Messages]['id'], CatalogMessage>>

export const LOCALE_METADATA: Readonly<
  Record<SupportedLocale, { direction: 'ltr' | 'rtl'; name: string }>
> = {
  en: { direction: 'ltr', name: 'English' },
  'zh-CN': { direction: 'ltr', name: '简体中文' },
}

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return value === 'en' || value === 'zh-CN'
}

function matchLanguageRange(value: string): SupportedLocale | null {
  const locale = value.trim().replaceAll('_', '-').toLowerCase()
  if (locale === 'en' || locale.startsWith('en-')) return 'en'
  if (
    locale === 'zh' ||
    locale === 'zh-cn' ||
    locale.startsWith('zh-cn-') ||
    locale === 'zh-sg' ||
    locale.startsWith('zh-sg-') ||
    locale.includes('-hans')
  ) {
    return 'zh-CN'
  }
  return null
}

function parseAcceptLanguage(value: string): string[] {
  return value
    .split(',')
    .map((part, index) => {
      const [range = '', ...parameters] = part.trim().split(';')
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().toLowerCase().startsWith('q='),
      )
      const parsedQuality = qualityParameter
        ? Number.parseFloat(qualityParameter.trim().slice(2))
        : 1
      const quality = Number.isFinite(parsedQuality) ? parsedQuality : 0
      return { index, quality, range }
    })
    .filter(({ quality, range }) => quality > 0 && range !== '*')
    .sort((left, right) => right.quality - left.quality || left.index - right.index)
    .map(({ range }) => range)
}

export function resolveLocale(
  cookieLocale?: string | null,
  acceptLanguage?: string | null,
): SupportedLocale {
  if (isSupportedLocale(cookieLocale)) return cookieLocale

  if (acceptLanguage) {
    for (const languageRange of parseAcceptLanguage(acceptLanguage)) {
      const locale = matchLanguageRange(languageRange)
      if (locale) return locale
    }
  }

  return 'en'
}

function resolveCatalogMessage(
  id: string,
  catalogs: readonly MessageCatalog[],
): CatalogMessage | undefined {
  for (let index = catalogs.length - 1; index >= 0; index -= 1) {
    const message = catalogs[index]?.[id]
    if (message !== undefined) return message
  }
  return undefined
}

function interpolate(
  template: string,
  values: MessageValues | undefined,
  numberFormatter: Intl.NumberFormat,
): string {
  if (!values) return template

  return template.replace(/\{([A-Za-z][\w.]*)\}/g, (placeholder, key: string) => {
    const value = values[key]
    if (value === undefined) return placeholder
    return typeof value === 'number' ? numberFormatter.format(value) : value
  })
}

export function createI18n(locale: SupportedLocale, catalogs: readonly MessageCatalog[] = []) {
  const numberFormatter = new Intl.NumberFormat(locale)
  const dateFormatter = new Intl.DateTimeFormat(locale)
  const pluralRules = new Intl.PluralRules(locale)

  return {
    locale,
    t(message: MessageDescriptor, values?: MessageValues): string {
      const catalogMessage = resolveCatalogMessage(message.id, catalogs)
      const template =
        typeof catalogMessage === 'string'
          ? catalogMessage
          : (catalogMessage?.other ?? message.defaultMessage)
      return interpolate(template, values, numberFormatter)
    },
    tPlural(message: PluralMessageDescriptor, count: number, values?: MessageValues): string {
      const catalogMessage = resolveCatalogMessage(message.id, catalogs)
      const category = pluralRules.select(count)
      const template =
        typeof catalogMessage === 'string'
          ? catalogMessage
          : ((category === 'one' ? catalogMessage?.one : undefined) ??
            catalogMessage?.other ??
            (category === 'one' ? message.defaultMessage.one : message.defaultMessage.other))

      return interpolate(template, { ...values, count }, numberFormatter)
    },
    formatNumber(value: number): string {
      return numberFormatter.format(value)
    },
    formatDate(value: Date | string | number): string {
      return dateFormatter.format(value instanceof Date ? value : new Date(value))
    },
  }
}

export type I18nFormatters = ReturnType<typeof createI18n>
