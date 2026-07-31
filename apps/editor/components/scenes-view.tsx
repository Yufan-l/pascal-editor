'use client'

import { useI18n } from '@pascal-app/i18n'
import Link from 'next/link'
import { appMessages } from '@/i18n/messages'
import { CreateSceneButton } from './save-button'
import type { SceneMeta } from './scene-loader'

function SceneDate({ value }: { value: string }) {
  const { formatDate } = useI18n()

  try {
    return <>{formatDate(value)}</>
  } catch {
    return <>{value}</>
  }
}

export function ScenesView({ scenes }: { scenes: SceneMeta[] }) {
  const { t, tPlural } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-border border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <nav className="flex items-center gap-4 text-sm">
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="/"
            >
              {t(appMessages.home)}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-foreground">{t(appMessages.scenes)}</span>
          </nav>
          <CreateSceneButton />
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 font-bold text-3xl">{t(appMessages.yourScenes)}</h1>
        <p className="mb-8 text-muted-foreground text-sm">
          {scenes.length === 0
            ? t(appMessages.noScenesPrompt)
            : tPlural(appMessages.sceneCount, scenes.length)}
        </p>

        {scenes.length === 0 ? (
          <div className="rounded-xl border border-border/60 border-dashed bg-background p-12 text-center">
            <p className="text-muted-foreground text-sm">{t(appMessages.noSavedScenes)}</p>
            <div className="mt-4 flex justify-center">
              <CreateSceneButton />
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenes.map((scene) => (
              <li key={scene.id}>
                <Link
                  className="group block rounded-xl border border-border/60 bg-background p-4 transition-colors hover:border-border hover:bg-accent/30"
                  href={`/scene/${scene.id}`}
                >
                  <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-accent/30">
                    {scene.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={scene.name}
                        className="h-full w-full object-cover"
                        src={scene.thumbnailUrl}
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        {t(appMessages.noThumbnail)}
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <h2 className="truncate font-semibold text-sm group-hover:text-foreground">
                      {scene.name}
                    </h2>
                    <div className="mt-1 flex items-center justify-between text-muted-foreground text-xs">
                      <span>{tPlural(appMessages.nodeCount, scene.nodeCount)}</span>
                      <time dateTime={scene.updatedAt}>
                        <SceneDate value={scene.updatedAt} />
                      </time>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
