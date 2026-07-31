'use client'

// Loads `@pascal-app/nodes`' built-in plugin into the node registry on the
// client. Mounted from `layout.tsx` so every page in the standalone
// editor gets the registry populated before its first `<Viewer>` /
// `<Editor>` mounts — without this the registry is empty on the client
// (the server registers in its own module instance, which is unreachable
// from hydrated pages) and every `NodeRenderer` resolves to `null`. The
// `loaded` guard inside `../lib/bootstrap` keeps the side effect
// idempotent under HMR.
import '../lib/bootstrap'
import { editorZhCN } from '@pascal-app/editor/i18n'
import { I18nProvider, type LocaleCatalogs, type SupportedLocale } from '@pascal-app/i18n'
import { nodesZhCN } from '@pascal-app/nodes/i18n'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { appZhCN } from '../i18n/zh-CN'

const FIRST_PARTY_CATALOGS = {
  'zh-CN': [appZhCN, editorZhCN, nodesZhCN],
} as const satisfies LocaleCatalogs

export function ClientBootstrap({
  children,
  enableDevDiagnostics,
  initialLocale,
}: {
  children: ReactNode
  enableDevDiagnostics: boolean
  initialLocale: SupportedLocale
}) {
  const [locale, setLocale] = useState(initialLocale)

  const handleLocaleChange = useCallback((nextLocale: SupportedLocale) => {
    setLocale(nextLocale)
    document.documentElement.lang = nextLocale
    document.cookie = `pascal-locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
  }, [])

  useEffect(() => {
    if (!enableDevDiagnostics) return
    import('react-scan').then(({ scan }) => scan({ enabled: true }))
  }, [enableDevDiagnostics])

  return (
    <I18nProvider
      catalogs={FIRST_PARTY_CATALOGS}
      locale={locale}
      onLocaleChange={handleLocaleChange}
    >
      {children}
    </I18nProvider>
  )
}
