'use client'

import { useI18n } from '@pascal-app/i18n'
import Link from 'next/link'
import { appMessages } from '@/i18n/messages'

export function SceneNotFound({ id }: { id: string }) {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background p-6 text-center shadow-xl">
        <p className="font-mono text-muted-foreground text-xs uppercase tracking-wide">404</p>
        <h1 className="mt-2 font-semibold text-lg">{t(appMessages.sceneNotFound)}</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          {t(appMessages.sceneNotFoundDescription, { id })}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Link
            className="rounded-md border border-border bg-accent px-3 py-2 font-medium text-sm hover:bg-accent/80"
            href="/scenes"
          >
            {t(appMessages.browseScenes)}
          </Link>
          <Link
            className="rounded-md border border-border bg-background px-3 py-2 font-medium text-sm hover:bg-accent/40"
            href="/"
          >
            {t(appMessages.backToEditor)}
          </Link>
        </div>
      </div>
    </div>
  )
}
