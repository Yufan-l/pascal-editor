'use client'

import type { SceneGraph } from '@pascal-app/editor'
import { useI18n } from '@pascal-app/i18n'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { appMessages } from '@/i18n/messages'

const EMPTY_GRAPH: SceneGraph = {
  nodes: {},
  rootNodeIds: [],
}

interface SaveButtonProps {
  sceneId: string
  name: string
  version: number
  getGraph: () => SceneGraph | null
}

/**
 * Creates a new empty scene and navigates the user to it.
 */
export function CreateSceneButton({ label }: { label?: string } = {}) {
  const { t } = useI18n()
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = useCallback(async () => {
    setIsCreating(true)
    setError(null)
    try {
      const response = await fetch('/api/scenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: t(appMessages.untitledScene), graph: EMPTY_GRAPH }),
      })
      if (!response.ok) {
        setError(t(appMessages.createFailedStatus, { status: response.status }))
        return
      }
      const meta = (await response.json()) as { id: string }
      router.push(`/scene/${meta.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : t(appMessages.createFailed))
    } finally {
      setIsCreating(false)
    }
  }, [router, t])

  return (
    <div className="flex items-center gap-3">
      {error && <span className="text-destructive text-xs">{error}</span>}
      <button
        className="rounded-md border border-border bg-accent px-3 py-1.5 font-medium text-sm hover:bg-accent/80 disabled:opacity-50"
        disabled={isCreating}
        onClick={handleCreate}
        type="button"
      >
        {isCreating ? t(appMessages.creating) : (label ?? t(appMessages.createNewScene))}
      </button>
    </div>
  )
}

/**
 * Save + Save-as buttons that call the scenes API directly.
 * Used for UIs that want explicit save controls outside of the Editor's
 * built-in autosave plumbing.
 */
export function SaveButton({ sceneId, name, version, getGraph }: SaveButtonProps) {
  const { t } = useI18n()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleSave = useCallback(async () => {
    const graph = getGraph()
    if (!graph) {
      setStatus(t(appMessages.noSceneToSave))
      return
    }
    setIsSaving(true)
    setStatus(null)
    try {
      const response = await fetch(`/api/scenes/${sceneId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'If-Match': String(version),
        },
        body: JSON.stringify({ name, graph }),
      })
      if (response.status === 409) {
        setStatus(t(appMessages.saveConflict))
        return
      }
      if (!response.ok) {
        setStatus(t(appMessages.saveFailedStatus, { status: response.status }))
        return
      }
      setStatus(t(appMessages.saved))
    } catch (error) {
      setStatus(error instanceof Error ? error.message : t(appMessages.saveFailed))
    } finally {
      setIsSaving(false)
    }
  }, [getGraph, name, sceneId, t, version])

  const handleSaveAs = useCallback(async () => {
    const graph = getGraph()
    if (!graph) {
      setStatus(t(appMessages.noSceneToSave))
      return
    }
    const newName =
      typeof window !== 'undefined' ? window.prompt(t(appMessages.newSceneName), name) : null
    if (!newName) return
    setIsSaving(true)
    setStatus(null)
    try {
      const response = await fetch('/api/scenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, graph }),
      })
      if (!response.ok) {
        setStatus(t(appMessages.saveAsFailedStatus, { status: response.status }))
        return
      }
      const meta = (await response.json()) as { id: string }
      router.push(`/scene/${meta.id}`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : t(appMessages.saveAsFailed))
    } finally {
      setIsSaving(false)
    }
  }, [getGraph, name, router, t])

  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded-md border border-border bg-accent px-3 py-1.5 font-medium text-xs hover:bg-accent/80 disabled:opacity-50"
        disabled={isSaving}
        onClick={handleSave}
        type="button"
      >
        {isSaving ? t(appMessages.saving) : t(appMessages.save)}
      </button>
      <button
        className="rounded-md border border-border bg-background px-3 py-1.5 font-medium text-xs hover:bg-accent/40 disabled:opacity-50"
        disabled={isSaving}
        onClick={handleSaveAs}
        type="button"
      >
        {t(appMessages.saveAs)}
      </button>
      {status && <span className="text-muted-foreground text-xs">{status}</span>}
    </div>
  )
}
