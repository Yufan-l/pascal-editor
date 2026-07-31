'use client'

import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react'
import { createI18n, type LocaleCatalogs, type SupportedLocale } from './runtime'

export type I18nContextValue = ReturnType<typeof createI18n> & {
  canChangeLocale: boolean
  setLocale: (locale: SupportedLocale) => void
}

const fallbackI18n: I18nContextValue = {
  ...createI18n('en'),
  canChangeLocale: false,
  setLocale: () => {},
}

const I18nContext = createContext<I18nContextValue>(fallbackI18n)

export function I18nProvider({
  locale,
  catalogs,
  onLocaleChange,
  children,
}: {
  locale: SupportedLocale
  catalogs?: LocaleCatalogs
  onLocaleChange?: (locale: SupportedLocale) => void
  children: ReactNode
}): ReactNode {
  const setLocale = useCallback(
    (nextLocale: SupportedLocale) => {
      if (nextLocale !== locale) onLocaleChange?.(nextLocale)
    },
    [locale, onLocaleChange],
  )
  const value = useMemo(
    () => ({
      ...createI18n(locale, catalogs?.[locale]),
      canChangeLocale: onLocaleChange !== undefined,
      setLocale,
    }),
    [catalogs, locale, onLocaleChange, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext)
}
