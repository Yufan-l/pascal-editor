import type { MessageDescriptor, PluralMessageDescriptor } from '@pascal-app/i18n'

export const editorMessages = {
  language: {
    id: 'editor.settings.language',
    defaultMessage: 'Language',
  },
  visibility: {
    id: 'editor.settings.visibility',
    defaultMessage: 'Visibility',
  },
  public: {
    id: 'editor.settings.public',
    defaultMessage: 'Public',
  },
  onlyYouCanView: {
    id: 'editor.settings.onlyYouCanView',
    defaultMessage: 'Only you can view',
  },
  anyoneCanView: {
    id: 'editor.settings.anyoneCanView',
    defaultMessage: 'Anyone can view',
  },
  show3dScans: {
    id: 'editor.settings.show3dScans',
    defaultMessage: 'Show 3D Scans',
  },
  showFloorplans: {
    id: 'editor.settings.showFloorplans',
    defaultMessage: 'Show Floorplans',
  },
  visibleToPublicViewers: {
    id: 'editor.settings.visibleToPublicViewers',
    defaultMessage: 'Visible to public viewers',
  },
  shadows: {
    id: 'editor.settings.shadows',
    defaultMessage: 'Shadows',
  },
  castShadowsFromLights: {
    id: 'editor.settings.castShadowsFromLights',
    defaultMessage: 'Cast shadows from lights',
  },
  export: {
    id: 'editor.settings.export',
    defaultMessage: 'Export',
  },
  model3d: {
    id: 'editor.settings.model3d',
    defaultMessage: '3D model',
  },
  exportGlb: {
    id: 'editor.settings.exportGlb',
    defaultMessage: 'Export GLB',
  },
  exportStl: {
    id: 'editor.settings.exportStl',
    defaultMessage: 'Export STL',
  },
  exportObj: {
    id: 'editor.settings.exportObj',
    defaultMessage: 'Export OBJ',
  },
  floorPlan: {
    id: 'editor.settings.floorPlan',
    defaultMessage: 'Floor plan',
  },
  defaultMode: {
    id: 'editor.settings.defaultMode',
    defaultMessage: 'Default mode',
  },
  expertMode: {
    id: 'editor.settings.expertMode',
    defaultMessage: 'Expert mode',
  },
  fullFloorPlan: {
    id: 'editor.settings.fullFloorPlan',
    defaultMessage: 'Full floor plan',
  },
  structureOnly: {
    id: 'editor.settings.structureOnly',
    defaultMessage: 'Structure only',
  },
  thumbnail: {
    id: 'editor.settings.thumbnail',
    defaultMessage: 'Thumbnail',
  },
  generating: {
    id: 'editor.settings.generating',
    defaultMessage: 'Generating…',
  },
  generateThumbnail: {
    id: 'editor.settings.generateThumbnail',
    defaultMessage: 'Generate Thumbnail',
  },
  saveAndLoad: {
    id: 'editor.settings.saveAndLoad',
    defaultMessage: 'Save & Load',
  },
  saveBuild: {
    id: 'editor.settings.saveBuild',
    defaultMessage: 'Save Build',
  },
  loadBuild: {
    id: 'editor.settings.loadBuild',
    defaultMessage: 'Load Build',
  },
  invalidJson: {
    id: 'editor.settings.invalidJson',
    defaultMessage: 'File could not be parsed as JSON.',
  },
  audio: {
    id: 'editor.settings.audio',
    defaultMessage: 'Audio',
  },
  keyboard: {
    id: 'editor.settings.keyboard',
    defaultMessage: 'Keyboard',
  },
  sceneGraph: {
    id: 'editor.settings.sceneGraph',
    defaultMessage: 'Scene Graph',
  },
  exploreSceneGraph: {
    id: 'editor.settings.exploreSceneGraph',
    defaultMessage: 'Explore scene graph',
  },
  dangerZone: {
    id: 'editor.settings.dangerZone',
    defaultMessage: 'Danger Zone',
  },
  clearAndStartNew: {
    id: 'editor.settings.clearAndStartNew',
    defaultMessage: 'Clear & Start New',
  },
  audioSettings: {
    id: 'editor.settings.audio.dialog.title',
    defaultMessage: 'Audio Settings',
  },
  audioSettingsDescription: {
    id: 'editor.settings.audio.dialog.description',
    defaultMessage: 'Adjust volume levels and mute settings',
  },
  masterVolume: {
    id: 'editor.settings.audio.masterVolume',
    defaultMessage: 'Master Volume',
  },
  radioVolume: {
    id: 'editor.settings.audio.radioVolume',
    defaultMessage: 'Radio Volume',
  },
  soundEffects: {
    id: 'editor.settings.audio.soundEffects',
    defaultMessage: 'Sound Effects',
  },
  unmuteAllSounds: {
    id: 'editor.settings.audio.unmuteAll',
    defaultMessage: 'Unmute All Sounds',
  },
  muteAllSounds: {
    id: 'editor.settings.audio.muteAll',
    defaultMessage: 'Mute All Sounds',
  },
  keyboardShortcuts: {
    id: 'editor.settings.shortcuts.title',
    defaultMessage: 'Keyboard Shortcuts',
  },
  keyboardShortcutsDescription: {
    id: 'editor.settings.shortcuts.description',
    defaultMessage:
      'Shortcuts are context-aware. Guided constraints are enabled by default; hold Shift during an active gesture to build freely.',
  },
  shortcutEditorNavigation: {
    id: 'editor.settings.shortcuts.category.navigation',
    defaultMessage: 'Editor Navigation',
  },
  shortcutModesHistory: {
    id: 'editor.settings.shortcuts.category.modesHistory',
    defaultMessage: 'Modes & History',
  },
  shortcutSelection: {
    id: 'editor.settings.shortcuts.category.selection',
    defaultMessage: 'Selection',
  },
  shortcutDirectManipulation: {
    id: 'editor.settings.shortcuts.category.directManipulation',
    defaultMessage: 'Direct Manipulation',
  },
  shortcutDrawingTools: {
    id: 'editor.settings.shortcuts.category.drawingTools',
    defaultMessage: 'Drawing Tools',
  },
  shortcutItemPlacement: {
    id: 'editor.settings.shortcuts.category.itemPlacement',
    defaultMessage: 'Item Placement',
  },
  shortcutCamera: {
    id: 'editor.settings.shortcuts.category.camera',
    defaultMessage: 'Camera',
  },
  shortcutSitePhase: {
    id: 'editor.settings.shortcuts.action.sitePhase',
    defaultMessage: 'Switch to Site phase',
  },
  shortcutStructurePhase: {
    id: 'editor.settings.shortcuts.action.structurePhase',
    defaultMessage: 'Switch to Structure phase',
  },
  shortcutFurnishPhase: {
    id: 'editor.settings.shortcuts.action.furnishPhase',
    defaultMessage: 'Switch to Furnish phase',
  },
  shortcutFurnishLayer: {
    id: 'editor.settings.shortcuts.action.furnishLayer',
    defaultMessage: 'Switch to Furnish layer',
  },
  shortcutZonesLayer: {
    id: 'editor.settings.shortcuts.action.zonesLayer',
    defaultMessage: 'Switch to Zones layer',
  },
  shortcutNextLevel: {
    id: 'editor.settings.shortcuts.action.nextLevel',
    defaultMessage: 'Select next level in the active building',
  },
  shortcutPreviousLevel: {
    id: 'editor.settings.shortcuts.action.previousLevel',
    defaultMessage: 'Select previous level in the active building',
  },
  shortcutToggleSidebar: {
    id: 'editor.settings.shortcuts.action.toggleSidebar',
    defaultMessage: 'Toggle sidebar',
  },
  shortcutSelectMode: {
    id: 'editor.settings.shortcuts.action.selectMode',
    defaultMessage: 'Switch to Select mode',
  },
  shortcutBuildMode: {
    id: 'editor.settings.shortcuts.action.buildMode',
    defaultMessage: 'Switch to Build mode',
  },
  shortcutMeasurementTool: {
    id: 'editor.settings.shortcuts.action.measurementTool',
    defaultMessage: 'Activate the last measurement tool',
  },
  shortcutDeleteMode: {
    id: 'editor.settings.shortcuts.action.deleteMode',
    defaultMessage: 'Switch to Delete mode',
  },
  shortcutCancelTool: {
    id: 'editor.settings.shortcuts.action.cancelTool',
    defaultMessage: 'Cancel the active tool and return to Select mode',
  },
  shortcutDeleteSelected: {
    id: 'editor.settings.shortcuts.action.deleteSelected',
    defaultMessage: 'Delete selected objects',
  },
  shortcutUndo: {
    id: 'editor.settings.shortcuts.action.undo',
    defaultMessage: 'Undo',
  },
  shortcutRedo: {
    id: 'editor.settings.shortcuts.action.redo',
    defaultMessage: 'Redo',
  },
  shortcutCopy: {
    id: 'editor.settings.shortcuts.action.copy',
    defaultMessage: 'Copy the selected objects',
  },
  shortcutCopyNote: {
    id: 'editor.settings.shortcuts.note.copy',
    defaultMessage:
      'The copied selection can be pasted into another level, project, or browser tab.',
  },
  shortcutCut: {
    id: 'editor.settings.shortcuts.action.cut',
    defaultMessage: 'Cut the selected objects',
  },
  shortcutCutNote: {
    id: 'editor.settings.shortcuts.note.cut',
    defaultMessage: 'Copies the selection to the clipboard, then removes it from this scene.',
  },
  shortcutPaste: {
    id: 'editor.settings.shortcuts.action.paste',
    defaultMessage: 'Paste and place copied objects',
  },
  shortcutPasteNote: {
    id: 'editor.settings.shortcuts.note.paste',
    defaultMessage:
      'Carries a preview under the cursor. Click to place it, or press Escape to cancel.',
  },
  shortcutToggleMultiSelection: {
    id: 'editor.settings.shortcuts.action.toggleMultiSelection',
    defaultMessage: 'Add or remove an object from multi-selection',
  },
  shortcutToggleMultiSelectionNote: {
    id: 'editor.settings.shortcuts.note.toggleMultiSelection',
    defaultMessage:
      'Works in Select mode on the 3D canvas, the 2D floor plan, and the scene graph.',
  },
  shortcutToggleCanvasSelection: {
    id: 'editor.settings.shortcuts.action.toggleCanvasSelection',
    defaultMessage: 'Add or remove an object from canvas multi-selection',
  },
  shortcutToggleCanvasSelectionNote: {
    id: 'editor.settings.shortcuts.note.toggleCanvasSelection',
    defaultMessage:
      'In the scene graph, Shift-click selects the visible range like a file browser.',
  },
  shortcutMoveMultiSelection: {
    id: 'editor.settings.shortcuts.action.moveMultiSelection',
    defaultMessage: 'Move the whole multi-selection',
  },
  shortcutMoveMultiSelectionNote: {
    id: 'editor.settings.shortcuts.note.moveMultiSelection',
    defaultMessage:
      'With 2+ objects selected, in 2D and 3D alike: drag the selection (or its dashed box) to slide it; click it to pick it up and place with the next click.',
  },
  shortcutRotateMultiSelection: {
    id: 'editor.settings.shortcuts.action.rotateMultiSelection',
    defaultMessage: 'Rotate a multi-selection ±45° around its center',
  },
  shortcutRotateMultiSelectionNote: {
    id: 'editor.settings.shortcuts.note.rotateMultiSelection',
    defaultMessage: 'Also works mid-move while carrying the selection.',
  },
  shortcutGroupSelection: {
    id: 'editor.settings.shortcuts.action.groupSelection',
    defaultMessage: 'Group the multi-selection (session only)',
  },
  shortcutGroupSelectionNote: {
    id: 'editor.settings.shortcuts.note.groupSelection',
    defaultMessage:
      'Editor-only. Plain click a member later to reselect the whole group. Not saved with the project.',
  },
  shortcutUngroupSelection: {
    id: 'editor.settings.shortcuts.action.ungroupSelection',
    defaultMessage: 'Ungroup the session selection',
  },
  shortcutUngroupSelectionNote: {
    id: 'editor.settings.shortcuts.note.ungroupSelection',
    defaultMessage: 'Keeps the current selection; only dissolves the session group.',
  },
  shortcutClearSelection: {
    id: 'editor.settings.shortcuts.action.clearSelection',
    defaultMessage: 'Clear the selection',
  },
  shortcutClearSelectionNote: {
    id: 'editor.settings.shortcuts.note.clearSelection',
    defaultMessage: 'Clicking empty space does the same.',
  },
  shortcutMoveSelected: {
    id: 'editor.settings.shortcuts.action.moveSelected',
    defaultMessage: 'Move the selected movable object under the cursor',
  },
  shortcutMoveSelectedNote: {
    id: 'editor.settings.shortcuts.note.moveSelected',
    defaultMessage:
      'Drag in Select mode with a single object selected. Guided snapping and guides are enabled by default.',
  },
  shortcutRotateSelected: {
    id: 'editor.settings.shortcuts.action.rotateSelected',
    defaultMessage: 'Rotate the selected object under the cursor',
  },
  shortcutRotateSelectedNote: {
    id: 'editor.settings.shortcuts.note.rotateSelected',
    defaultMessage:
      'Drag left or right in Select mode with a single object selected. Rotation snaps to 15° increments by default.',
  },
  shortcutRotateFreely: {
    id: 'editor.settings.shortcuts.action.rotateFreely',
    defaultMessage: 'Rotate freely',
  },
  shortcutRotateFreelyNote: {
    id: 'editor.settings.shortcuts.note.rotateFreely',
    defaultMessage: 'Hold Shift during the drag to bypass the 15° rotation increment.',
  },
  shortcutBypassConstraints: {
    id: 'editor.settings.shortcuts.action.bypassConstraints',
    defaultMessage: 'Bypass guided snapping and angle constraints',
  },
  shortcutBypassConstraintsNote: {
    id: 'editor.settings.shortcuts.note.bypassConstraints',
    defaultMessage:
      'Hold during the active gesture. Passive guide or measurement feedback may stay visible.',
  },
  shortcutBypassRotationSnap: {
    id: 'editor.settings.shortcuts.action.bypassRotationSnap',
    defaultMessage: 'Rotate freely, bypassing the default 15° rotation snap',
  },
  shortcutBypassRotationSnapNote: {
    id: 'editor.settings.shortcuts.note.bypassRotationSnap',
    defaultMessage: 'Hold while dragging a rotate handle or direct-rotation gesture.',
  },
  shortcutRotateItem: {
    id: 'editor.settings.shortcuts.action.rotateItem',
    defaultMessage: 'Rotate item; with a door selected, R toggles open/closed and T closes',
  },
  shortcutOperateNode: {
    id: 'editor.settings.shortcuts.action.operateNode',
    defaultMessage:
      'Operate the selected node — doors, windows, and cabinet doors/drawers animate open/closed',
  },
  shortcutBypassPlacement: {
    id: 'editor.settings.shortcuts.action.bypassPlacement',
    defaultMessage: 'Temporarily bypass placement validation constraints',
  },
  shortcutHoldWhilePlacing: {
    id: 'editor.settings.shortcuts.note.holdWhilePlacing',
    defaultMessage: 'Hold while placing.',
  },
  shortcutPanCamera: {
    id: 'editor.settings.shortcuts.action.panCamera',
    defaultMessage: 'Pan camera',
  },
  shortcutPanCameraKeysNote: {
    id: 'editor.settings.shortcuts.note.panCameraKeys',
    defaultMessage: 'Moves in screen space, similar to dragging the camera view.',
  },
  shortcutPanCameraMouseNote: {
    id: 'editor.settings.shortcuts.note.panCameraMouse',
    defaultMessage:
      'Drag with the middle mouse button, or hold Space while dragging with the left mouse button.',
  },
  shortcutOrbitCamera: {
    id: 'editor.settings.shortcuts.action.orbitCamera',
    defaultMessage: 'Orbit camera',
  },
  shortcutOrbitCameraNote: {
    id: 'editor.settings.shortcuts.note.orbitCamera',
    defaultMessage: 'Drag with the right mouse button.',
  },
  shortcutLeftClick: {
    id: 'editor.settings.shortcuts.input.leftClick',
    defaultMessage: 'Left click',
  },
  shortcutRightClick: {
    id: 'editor.settings.shortcuts.input.rightClick',
    defaultMessage: 'Right click',
  },
  shortcutMiddleClick: {
    id: 'editor.settings.shortcuts.input.middleClick',
    defaultMessage: 'Middle click',
  },
  importReady: {
    id: 'editor.settings.import.ready',
    defaultMessage: 'Ready to import',
  },
  importCannot: {
    id: 'editor.settings.import.cannot',
    defaultMessage: 'Cannot import this file',
  },
  importNodeCount: {
    id: 'editor.settings.import.nodeCount',
    defaultMessage: {
      one: '{count} node',
      other: '{count} nodes',
    },
  },
  importErrorCount: {
    id: 'editor.settings.import.errorCount',
    defaultMessage: {
      one: '{count} error',
      other: '{count} errors',
    },
  },
  importWarningCount: {
    id: 'editor.settings.import.warningCount',
    defaultMessage: {
      one: '{count} warning',
      other: '{count} warnings',
    },
  },
  importStructure: {
    id: 'editor.settings.import.structure',
    defaultMessage: 'Structure',
  },
  importSites: {
    id: 'editor.settings.import.stats.sites',
    defaultMessage: 'Sites',
  },
  importBuildings: {
    id: 'editor.settings.import.stats.buildings',
    defaultMessage: 'Buildings',
  },
  importLevels: {
    id: 'editor.settings.import.stats.levels',
    defaultMessage: 'Levels',
  },
  importWalls: {
    id: 'editor.settings.import.stats.walls',
    defaultMessage: 'Walls',
  },
  importDoors: {
    id: 'editor.settings.import.stats.doors',
    defaultMessage: 'Doors',
  },
  importWindows: {
    id: 'editor.settings.import.stats.windows',
    defaultMessage: 'Windows',
  },
  importItems: {
    id: 'editor.settings.import.stats.items',
    defaultMessage: 'Items',
  },
  importSlabs: {
    id: 'editor.settings.import.stats.slabs',
    defaultMessage: 'Slabs',
  },
  importCeilings: {
    id: 'editor.settings.import.stats.ceilings',
    defaultMessage: 'Ceilings',
  },
  importZones: {
    id: 'editor.settings.import.stats.zones',
    defaultMessage: 'Zones',
  },
  importScans: {
    id: 'editor.settings.import.stats.scans',
    defaultMessage: 'Scans',
  },
  importFloorArea: {
    id: 'editor.settings.import.floorArea',
    defaultMessage: 'Floor area',
  },
  importNoRecognisedNodes: {
    id: 'editor.settings.import.noRecognisedNodes',
    defaultMessage: 'The file contains no recognised nodes.',
  },
  importShowMore: {
    id: 'editor.settings.import.showMore',
    defaultMessage: 'Show {count} more',
  },
  importSchemaDetails: {
    id: 'editor.settings.import.schemaDetails',
    defaultMessage: {
      one: 'Schema details ({count} node)',
      other: 'Schema details ({count} nodes)',
    },
  },
  hide: {
    id: 'editor.actions.hide',
    defaultMessage: 'Hide',
  },
  show: {
    id: 'editor.actions.show',
    defaultMessage: 'Show',
  },
  cancel: {
    id: 'editor.actions.cancel',
    defaultMessage: 'Cancel',
  },
  replaceCurrentScene: {
    id: 'editor.settings.import.replaceCurrentScene',
    defaultMessage: 'Replace current scene',
  },
  actions: {
    id: 'editor.inspector.actions',
    defaultMessage: 'Actions',
  },
  move: {
    id: 'editor.actions.move',
    defaultMessage: 'Move',
  },
  delete: {
    id: 'editor.actions.delete',
    defaultMessage: 'Delete',
  },
  deleteWithContents: {
    id: 'editor.actions.deleteWithContents',
    defaultMessage: 'Delete with contents',
  },
  guidedConstraintsBypassed: {
    id: 'editor.helpers.guidedConstraintsBypassed',
    defaultMessage: 'Guided constraints bypassed',
  },
  node: {
    id: 'editor.nodes.fallback',
    defaultMessage: 'Node',
  },
  pinned: {
    id: 'editor.measurements.pinned',
    defaultMessage: 'Pinned',
  },
  live: {
    id: 'editor.measurements.live',
    defaultMessage: 'Live',
  },
  liveLens: {
    id: 'editor.measurements.liveLens',
    defaultMessage: 'Live lens',
  },
  quickMeasurementsAria: {
    id: 'editor.measurements.quick.aria',
    defaultMessage: '{state} {kind} measurements',
  },
  replacePinnedMeasurement: {
    id: 'editor.measurements.quick.replace',
    defaultMessage: 'Click another surface to replace',
  },
  pinMeasurement: {
    id: 'editor.measurements.quick.pin',
    defaultMessage: 'Click surface to pin',
  },
} as const satisfies Record<string, MessageDescriptor | PluralMessageDescriptor>

export type EditorMessageKey = {
  [Key in keyof typeof editorMessages]: (typeof editorMessages)[Key] extends MessageDescriptor
    ? Key
    : never
}[keyof typeof editorMessages]
