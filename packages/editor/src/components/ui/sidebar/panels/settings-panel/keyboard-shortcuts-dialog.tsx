import { useI18n } from '@pascal-app/i18n'
import { Keyboard } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  type EditorMessageKey,
  editorMessages,
} from '../../../../../i18n/messages'
import { Button } from './../../../../../components/ui/primitives/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './../../../../../components/ui/primitives/dialog'
import { ShortcutToken } from './../../../../../components/ui/primitives/shortcut-token'

type Shortcut = {
  keys: string[]
  actionKey: EditorMessageKey
  noteKey?: EditorMessageKey
}

type ShortcutCategory = {
  titleKey: EditorMessageKey
  shortcuts: Shortcut[]
}

const KEY_DISPLAY_MAP: Record<string, string> = {
  'Arrow Up': '↑',
  'Arrow Down': '↓',
  Esc: '⎋',
  Shift: '⇧',
  Space: '␣',
}

const SHORTCUT_CATEGORIES: ShortcutCategory[] = [
  {
    titleKey: 'shortcutEditorNavigation',
    shortcuts: [
      { keys: ['1'], actionKey: 'shortcutSitePhase' },
      { keys: ['2'], actionKey: 'shortcutStructurePhase' },
      { keys: ['3'], actionKey: 'shortcutFurnishPhase' },
      { keys: ['F'], actionKey: 'shortcutFurnishLayer' },
      { keys: ['Z'], actionKey: 'shortcutZonesLayer' },
      {
        keys: ['Cmd/Ctrl', 'Arrow Up'],
        actionKey: 'shortcutNextLevel',
      },
      {
        keys: ['Cmd/Ctrl', 'Arrow Down'],
        actionKey: 'shortcutPreviousLevel',
      },
      { keys: ['Cmd/Ctrl', 'B'], actionKey: 'shortcutToggleSidebar' },
    ],
  },
  {
    titleKey: 'shortcutModesHistory',
    shortcuts: [
      { keys: ['V'], actionKey: 'shortcutSelectMode' },
      { keys: ['B'], actionKey: 'shortcutBuildMode' },
      { keys: ['M'], actionKey: 'shortcutMeasurementTool' },
      { keys: ['X'], actionKey: 'shortcutDeleteMode' },
      {
        keys: ['Esc'],
        actionKey: 'shortcutCancelTool',
      },
      { keys: ['Delete / Backspace'], actionKey: 'shortcutDeleteSelected' },
      { keys: ['Cmd/Ctrl', 'Z'], actionKey: 'shortcutUndo' },
      { keys: ['Cmd/Ctrl', 'Shift', 'Z'], actionKey: 'shortcutRedo' },
    ],
  },
  {
    titleKey: 'shortcutSelection',
    shortcuts: [
      {
        keys: ['Cmd/Ctrl', 'C'],
        actionKey: 'shortcutCopy',
        noteKey: 'shortcutCopyNote',
      },
      {
        keys: ['Cmd/Ctrl', 'X'],
        actionKey: 'shortcutCut',
        noteKey: 'shortcutCutNote',
      },
      {
        keys: ['Cmd/Ctrl', 'V'],
        actionKey: 'shortcutPaste',
        noteKey: 'shortcutPasteNote',
      },
      {
        keys: ['Cmd/Ctrl', 'Left click'],
        actionKey: 'shortcutToggleMultiSelection',
        noteKey: 'shortcutToggleMultiSelectionNote',
      },
      {
        keys: ['Shift', 'Left click'],
        actionKey: 'shortcutToggleCanvasSelection',
        noteKey: 'shortcutToggleCanvasSelectionNote',
      },
      {
        keys: ['Left click'],
        actionKey: 'shortcutMoveMultiSelection',
        noteKey: 'shortcutMoveMultiSelectionNote',
      },
      {
        keys: ['R', 'T'],
        actionKey: 'shortcutRotateMultiSelection',
        noteKey: 'shortcutRotateMultiSelectionNote',
      },
      {
        keys: ['Cmd/Ctrl', 'G'],
        actionKey: 'shortcutGroupSelection',
        noteKey: 'shortcutGroupSelectionNote',
      },
      {
        keys: ['Cmd/Ctrl', 'Shift', 'G'],
        actionKey: 'shortcutUngroupSelection',
        noteKey: 'shortcutUngroupSelectionNote',
      },
      {
        keys: ['Esc'],
        actionKey: 'shortcutClearSelection',
        noteKey: 'shortcutClearSelectionNote',
      },
    ],
  },
  {
    titleKey: 'shortcutDirectManipulation',
    shortcuts: [
      {
        keys: ['Cmd/Ctrl', 'Left click'],
        actionKey: 'shortcutMoveSelected',
        noteKey: 'shortcutMoveSelectedNote',
      },
      {
        keys: ['Cmd/Ctrl', 'Right click'],
        actionKey: 'shortcutRotateSelected',
        noteKey: 'shortcutRotateSelectedNote',
      },
      {
        keys: ['Cmd/Ctrl', 'Shift', 'Right click'],
        actionKey: 'shortcutRotateFreely',
        noteKey: 'shortcutRotateFreelyNote',
      },
    ],
  },
  {
    titleKey: 'shortcutDrawingTools',
    shortcuts: [
      {
        keys: ['Shift'],
        actionKey: 'shortcutBypassConstraints',
        noteKey: 'shortcutBypassConstraintsNote',
      },
      {
        keys: ['Shift'],
        actionKey: 'shortcutBypassRotationSnap',
        noteKey: 'shortcutBypassRotationSnapNote',
      },
    ],
  },
  {
    titleKey: 'shortcutItemPlacement',
    shortcuts: [
      {
        keys: ['R', 'T'],
        actionKey: 'shortcutRotateItem',
      },
      {
        keys: ['E'],
        actionKey: 'shortcutOperateNode',
      },
      {
        keys: ['Shift'],
        actionKey: 'shortcutBypassPlacement',
        noteKey: 'shortcutHoldWhilePlacing',
      },
    ],
  },
  {
    titleKey: 'shortcutCamera',
    shortcuts: [
      {
        keys: ['W', 'A', 'S', 'D'],
        actionKey: 'shortcutPanCamera',
        noteKey: 'shortcutPanCameraKeysNote',
      },
      {
        keys: ['Middle click'],
        actionKey: 'shortcutPanCamera',
        noteKey: 'shortcutPanCameraMouseNote',
      },
      {
        keys: ['Right click'],
        actionKey: 'shortcutOrbitCamera',
        noteKey: 'shortcutOrbitCameraNote',
      },
    ],
  },
]

function ShortcutKeys({ keys }: { keys: string[] }) {
  const { t } = useI18n()
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  const getDisplayKey = (key: string): string => {
    if (key === 'Cmd/Ctrl') return isMac ? '⌘' : 'Ctrl'
    if (key === 'Delete / Backspace') return isMac ? '⌫' : 'Backspace'
    if (key === 'Left click') return t(editorMessages.shortcutLeftClick)
    if (key === 'Right click') return t(editorMessages.shortcutRightClick)
    if (key === 'Middle click') return t(editorMessages.shortcutMiddleClick)
    return KEY_DISPLAY_MAP[key] ?? key
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      {keys.map((key, index) => (
        <div className="flex items-center gap-1" key={`${key}-${index}`}>
          {index > 0 ? <span className="text-[10px] text-muted-foreground">+</span> : null}
          <ShortcutToken displayValue={getDisplayKey(key)} value={key} />
        </div>
      ))}
    </div>
  )
}

export function KeyboardShortcutsDialog() {
  const { t } = useI18n()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start gap-2" variant="outline">
          <Keyboard className="size-4" />
          {t(editorMessages.keyboardShortcuts)}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle>{t(editorMessages.keyboardShortcuts)}</DialogTitle>
          <DialogDescription>{t(editorMessages.keyboardShortcutsDescription)}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-4">
          {SHORTCUT_CATEGORIES.map((category) => (
            <section className="space-y-2" key={category.titleKey}>
              <h3 className="font-medium text-sm">{t(editorMessages[category.titleKey])}</h3>
              <div className="overflow-hidden rounded-md border border-border/80">
                {category.shortcuts.map((shortcut, index) => (
                  <div
                    className="grid grid-cols-[minmax(130px,220px)_1fr] gap-3 px-3 py-2"
                    key={`${category.titleKey}-${shortcut.actionKey}`}
                  >
                    <ShortcutKeys keys={shortcut.keys} />
                    <div>
                      <p className="text-sm">{t(editorMessages[shortcut.actionKey])}</p>
                      {shortcut.noteKey ? (
                        <p className="text-muted-foreground text-xs">
                          {t(editorMessages[shortcut.noteKey])}
                        </p>
                      ) : null}
                    </div>
                    {index < category.shortcuts.length - 1 ? (
                      <div className="col-span-2 border-border/60 border-b" />
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
