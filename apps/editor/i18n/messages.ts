import type { MessageDescriptor, PluralMessageDescriptor } from '@pascal-app/i18n'

export const appMessages = {
  scene: {
    id: 'app.sidebar.scene',
    defaultMessage: 'Scene',
  },
  build: {
    id: 'app.sidebar.build',
    defaultMessage: 'Build',
  },
  items: {
    id: 'app.sidebar.items',
    defaultMessage: 'Items',
  },
  settings: {
    id: 'app.sidebar.settings',
    defaultMessage: 'Settings',
  },
  localEditorNotice: {
    id: 'app.localEditor.notice',
    defaultMessage: 'Blank canvas — saved scenes are under Scenes (not this page).',
  },
  openRecentScenes: {
    id: 'app.localEditor.openRecentScenes',
    defaultMessage: 'Open saved scenes',
  },
  allScenes: {
    id: 'app.scenes.all',
    defaultMessage: 'All scenes',
  },
  home: {
    id: 'app.navigation.home',
    defaultMessage: 'Home',
  },
  scenes: {
    id: 'app.navigation.scenes',
    defaultMessage: 'Scenes',
  },
  yourScenes: {
    id: 'app.scenes.title',
    defaultMessage: 'Your scenes',
  },
  noScenesPrompt: {
    id: 'app.scenes.empty.prompt',
    defaultMessage: 'No scenes yet. Create one to get started.',
  },
  sceneCount: {
    id: 'app.scenes.count',
    defaultMessage: {
      one: '{count} scene.',
      other: '{count} scenes.',
    },
  },
  noSavedScenes: {
    id: 'app.scenes.empty.detail',
    defaultMessage: "You haven't saved any scenes yet.",
  },
  noThumbnail: {
    id: 'app.scenes.noThumbnail',
    defaultMessage: 'No thumbnail',
  },
  nodeCount: {
    id: 'app.scenes.nodeCount',
    defaultMessage: {
      one: '{count} node',
      other: '{count} nodes',
    },
  },
  createNewScene: {
    id: 'app.scenes.create',
    defaultMessage: 'Create new scene',
  },
  creating: {
    id: 'app.scenes.creating',
    defaultMessage: 'Creating…',
  },
  untitledScene: {
    id: 'app.scenes.untitled',
    defaultMessage: 'Untitled scene',
  },
  createFailedStatus: {
    id: 'app.scenes.createFailedStatus',
    defaultMessage: 'Failed to create scene ({status})',
  },
  createFailed: {
    id: 'app.scenes.createFailed',
    defaultMessage: 'Failed to create scene',
  },
  noSceneToSave: {
    id: 'app.scenes.noSceneToSave',
    defaultMessage: 'No scene to save',
  },
  saveConflict: {
    id: 'app.scenes.saveConflict',
    defaultMessage: 'Conflict — reload to continue',
  },
  saveFailedStatus: {
    id: 'app.scenes.saveFailedStatus',
    defaultMessage: 'Save failed ({status})',
  },
  saveFailed: {
    id: 'app.scenes.saveFailed',
    defaultMessage: 'Save failed',
  },
  saved: {
    id: 'app.scenes.saved',
    defaultMessage: 'Saved',
  },
  newSceneName: {
    id: 'app.scenes.newName',
    defaultMessage: 'New scene name',
  },
  saveAsFailedStatus: {
    id: 'app.scenes.saveAsFailedStatus',
    defaultMessage: 'Save-as failed ({status})',
  },
  saveAsFailed: {
    id: 'app.scenes.saveAsFailed',
    defaultMessage: 'Save-as failed',
  },
  saving: {
    id: 'app.scenes.saving',
    defaultMessage: 'Saving…',
  },
  save: {
    id: 'app.scenes.save',
    defaultMessage: 'Save',
  },
  saveAs: {
    id: 'app.scenes.saveAs',
    defaultMessage: 'Save as…',
  },
  sceneNotFound: {
    id: 'app.scene.notFound.title',
    defaultMessage: 'Scene not found',
  },
  sceneNotFoundDescription: {
    id: 'app.scene.notFound.description',
    defaultMessage: "We couldn't find a scene with id {id}.",
  },
  browseScenes: {
    id: 'app.scene.notFound.browse',
    defaultMessage: 'Browse scenes',
  },
  backToEditor: {
    id: 'app.scene.notFound.back',
    defaultMessage: 'Back to editor',
  },
  liveConnectionClosed: {
    id: 'app.scene.liveConnectionClosed',
    defaultMessage: 'Live scene connection closed',
  },
  conflictTitle: {
    id: 'app.scene.conflict.title',
    defaultMessage: 'Another session saved first — refresh?',
  },
  conflictDescription: {
    id: 'app.scene.conflict.description',
    defaultMessage: "Your changes haven't been saved. Reload to pick up the latest version.",
  },
  reload: {
    id: 'app.actions.reload',
    defaultMessage: 'Reload',
  },
  dismiss: {
    id: 'app.actions.dismiss',
    defaultMessage: 'Dismiss',
  },
  lightPreview: {
    id: 'app.scene.lightPreview',
    defaultMessage: 'Light preview',
  },
  lightPreviewDescription: {
    id: 'app.scene.lightPreview.description',
    defaultMessage:
      'Skip the post-processing pipeline — lighter on the GPU, no ambient occlusion or selection outlines',
  },
  wall: {
    id: 'app.build.wall',
    defaultMessage: 'Wall',
  },
  fence: {
    id: 'app.build.fence',
    defaultMessage: 'Fence',
  },
  slab: {
    id: 'app.build.slab',
    defaultMessage: 'Slab',
  },
  ceiling: {
    id: 'app.build.ceiling',
    defaultMessage: 'Ceiling',
  },
  roof: {
    id: 'app.build.roof',
    defaultMessage: 'Roof',
  },
  stairs: {
    id: 'app.build.stairs',
    defaultMessage: 'Stairs',
  },
  elevator: {
    id: 'app.build.elevator',
    defaultMessage: 'Elevator',
  },
  door: {
    id: 'app.build.door',
    defaultMessage: 'Door',
  },
  window: {
    id: 'app.build.window',
    defaultMessage: 'Window',
  },
  column: {
    id: 'app.build.column',
    defaultMessage: 'Column',
  },
  shelf: {
    id: 'app.build.shelf',
    defaultMessage: 'Shelf',
  },
  spawnPoint: {
    id: 'app.build.spawnPoint',
    defaultMessage: 'Spawn Point',
  },
  mep: {
    id: 'app.build.mep',
    defaultMessage: 'MEP',
  },
  painting: {
    id: 'app.build.painting',
    defaultMessage: 'Painting',
  },
  terrain: {
    id: 'app.build.terrain',
    defaultMessage: 'Terrain',
  },
  features: {
    id: 'app.build.features',
    defaultMessage: 'Features',
  },
  duct: {
    id: 'app.build.duct',
    defaultMessage: 'Duct',
  },
  register: {
    id: 'app.build.register',
    defaultMessage: 'Register',
  },
  hvacUnit: {
    id: 'app.build.hvacUnit',
    defaultMessage: 'HVAC Unit',
  },
  lineset: {
    id: 'app.build.lineset',
    defaultMessage: 'Lineset',
  },
  liquidLine: {
    id: 'app.build.liquidLine',
    defaultMessage: 'Liquid Line',
  },
  dwvPipe: {
    id: 'app.build.dwvPipe',
    defaultMessage: 'DWV Pipe',
  },
  addFitting: {
    id: 'app.build.addFitting',
    defaultMessage: 'Add Fitting',
  },
  addTrap: {
    id: 'app.build.addTrap',
    defaultMessage: 'Add Trap',
  },
  followLineset: {
    id: 'app.build.followLineset',
    defaultMessage: 'Follow lineset',
  },
  on: {
    id: 'app.common.on',
    defaultMessage: 'On',
  },
  off: {
    id: 'app.common.off',
    defaultMessage: 'Off',
  },
  followLinesetActive: {
    id: 'app.build.followLineset.active',
    defaultMessage: 'Click a lineset to lay the line beside it.',
  },
  followLinesetInactive: {
    id: 'app.build.followLineset.inactive',
    defaultMessage: 'Trace a line alongside an existing lineset (F).',
  },
  view3d: {
    id: 'app.toolbar.view3d',
    defaultMessage: '3D',
  },
  view2d: {
    id: 'app.toolbar.view2d',
    defaultMessage: '2D',
  },
  splitView: {
    id: 'app.toolbar.splitView',
    defaultMessage: 'Split',
  },
  expandSidebar: {
    id: 'app.toolbar.expandSidebar',
    defaultMessage: 'Expand sidebar',
  },
  collapseSidebar: {
    id: 'app.toolbar.collapseSidebar',
    defaultMessage: 'Collapse sidebar',
  },
  levelsWithMode: {
    id: 'app.toolbar.levelsWithMode',
    defaultMessage: 'Levels: {mode}',
  },
  levelsManual: {
    id: 'app.toolbar.levels.manual',
    defaultMessage: 'Manual',
  },
  levelsStack: {
    id: 'app.toolbar.levels.stack',
    defaultMessage: 'Stack',
  },
  levelsExploded: {
    id: 'app.toolbar.levels.exploded',
    defaultMessage: 'Exploded',
  },
  levelsSolo: {
    id: 'app.toolbar.levels.solo',
    defaultMessage: 'Solo',
  },
  wallsWithMode: {
    id: 'app.toolbar.wallsWithMode',
    defaultMessage: 'Walls: {mode}',
  },
  wallsFullHeight: {
    id: 'app.toolbar.walls.fullHeight',
    defaultMessage: 'Full height',
  },
  wallsCutaway: {
    id: 'app.toolbar.walls.cutaway',
    defaultMessage: 'Cutaway',
  },
  wallsLow: {
    id: 'app.toolbar.walls.low',
    defaultMessage: 'Low',
  },
  wallsTranslucent: {
    id: 'app.toolbar.walls.translucent',
    defaultMessage: 'Translucent',
  },
  displaySettings: {
    id: 'app.toolbar.displaySettings',
    defaultMessage: 'Display settings',
  },
  display: {
    id: 'app.toolbar.display',
    defaultMessage: 'Display',
  },
  grid: {
    id: 'app.toolbar.grid',
    defaultMessage: 'Grid',
  },
  measurements: {
    id: 'app.toolbar.measurements',
    defaultMessage: 'Measurements',
  },
  measurements3d: {
    id: 'app.toolbar.measurements3d',
    defaultMessage: '3D measurements',
  },
  floorPlanMode: {
    id: 'app.toolbar.floorPlanMode',
    defaultMessage: 'Floor plan mode',
  },
  default: {
    id: 'app.toolbar.default',
    defaultMessage: 'Default',
  },
  expert: {
    id: 'app.toolbar.expert',
    defaultMessage: 'Expert',
  },
  defaultModeDetail: {
    id: 'app.toolbar.floorPlanMode.default.detail',
    defaultMessage: 'Clean plan; dimensions appear with selection',
  },
  expertModeDetail: {
    id: 'app.toolbar.floorPlanMode.expert.detail',
    defaultMessage: 'Full documentation and annotation controls',
  },
  floorPlanAnnotations: {
    id: 'app.toolbar.floorPlanAnnotations',
    defaultMessage: 'Floor plan annotations',
  },
  automaticDimensions: {
    id: 'app.toolbar.annotations.automaticDimensions',
    defaultMessage: 'Automatic dimensions',
  },
  manualDimensions: {
    id: 'app.toolbar.annotations.manualDimensions',
    defaultMessage: 'Manual dimensions',
  },
  openingMarks: {
    id: 'app.toolbar.annotations.openingMarks',
    defaultMessage: 'Door/window marks',
  },
  structuralGrids: {
    id: 'app.toolbar.annotations.structuralGrids',
    defaultMessage: 'Structural grids & column centers',
  },
  roomLabels: {
    id: 'app.toolbar.annotations.roomLabels',
    defaultMessage: 'Room labels',
  },
  stairAnnotations: {
    id: 'app.toolbar.annotations.stairAnnotations',
    defaultMessage: 'Stair annotations',
  },
  wallDimensions: {
    id: 'app.toolbar.wallDimensions',
    defaultMessage: 'Wall dimensions',
  },
  finishedFaces: {
    id: 'app.toolbar.wallDimensions.finishedFaces',
    defaultMessage: 'Finished faces',
  },
  finishedFacesDetail: {
    id: 'app.toolbar.wallDimensions.finishedFaces.detail',
    defaultMessage: 'Full wall thickness',
  },
  wallCenterline: {
    id: 'app.toolbar.wallDimensions.centerline',
    defaultMessage: 'Wall centerline',
  },
  wallCenterlineDetail: {
    id: 'app.toolbar.wallDimensions.centerline.detail',
    defaultMessage: 'Single wall axis',
  },
  studFaces: {
    id: 'app.toolbar.wallDimensions.studFaces',
    defaultMessage: 'Face of stud',
  },
  studFacesDetail: {
    id: 'app.toolbar.wallDimensions.studFaces.detail',
    defaultMessage: 'Structural core face',
  },
  magneticSnap: {
    id: 'app.toolbar.magneticSnap',
    defaultMessage: 'Magnetic snap',
  },
  shadows: {
    id: 'app.toolbar.shadows',
    defaultMessage: 'Shadows',
  },
  camera: {
    id: 'app.toolbar.camera',
    defaultMessage: 'Camera',
  },
  perspective: {
    id: 'app.toolbar.perspective',
    defaultMessage: 'Perspective',
  },
  orthographic: {
    id: 'app.toolbar.orthographic',
    defaultMessage: 'Orthographic',
  },
  units: {
    id: 'app.toolbar.units',
    defaultMessage: 'Units',
  },
  meters: {
    id: 'app.toolbar.units.meters',
    defaultMessage: 'Meters',
  },
  millimeters: {
    id: 'app.toolbar.units.millimeters',
    defaultMessage: 'Millimeters',
  },
  feetAndInches: {
    id: 'app.toolbar.units.feetAndInches',
    defaultMessage: 'Feet & inches',
  },
  render: {
    id: 'app.toolbar.render',
    defaultMessage: 'Render',
  },
  solid: {
    id: 'app.toolbar.shading.solid',
    defaultMessage: 'Solid',
  },
  solidDetail: {
    id: 'app.toolbar.shading.solid.detail',
    defaultMessage: 'Flat and fast — no ambient occlusion',
  },
  rendered: {
    id: 'app.toolbar.shading.rendered',
    defaultMessage: 'Rendered',
  },
  renderedDetail: {
    id: 'app.toolbar.shading.rendered.detail',
    defaultMessage: 'Full ambient occlusion',
  },
  edges: {
    id: 'app.toolbar.edges',
    defaultMessage: 'Edges',
  },
  edgesOff: {
    id: 'app.toolbar.edges.off',
    defaultMessage: 'Off',
  },
  edgesOffDetail: {
    id: 'app.toolbar.edges.off.detail',
    defaultMessage: 'No edge lines',
  },
  edgesSoft: {
    id: 'app.toolbar.edges.soft',
    defaultMessage: 'Soft',
  },
  edgesSoftDetail: {
    id: 'app.toolbar.edges.soft.detail',
    defaultMessage: 'Faint outline of major creases',
  },
  edgesStrong: {
    id: 'app.toolbar.edges.strong',
    defaultMessage: 'Strong',
  },
  edgesStrongDetail: {
    id: 'app.toolbar.edges.strong.detail',
    defaultMessage: 'Crisp, opaque edge lines',
  },
  theme: {
    id: 'app.toolbar.theme',
    defaultMessage: 'Theme',
  },
  themeStudio: {
    id: 'app.toolbar.theme.studio',
    defaultMessage: 'Studio',
  },
  themePaper: {
    id: 'app.toolbar.theme.paper',
    defaultMessage: 'Paper',
  },
  themeSunset: {
    id: 'app.toolbar.theme.sunset',
    defaultMessage: 'Sunset',
  },
  themeOvercast: {
    id: 'app.toolbar.theme.overcast',
    defaultMessage: 'Overcast',
  },
  themeBlueprint: {
    id: 'app.toolbar.theme.blueprint',
    defaultMessage: 'Blueprint',
  },
  themeMediterranean: {
    id: 'app.toolbar.theme.mediterranean',
    defaultMessage: 'Mediterranean',
  },
  themeTwilight: {
    id: 'app.toolbar.theme.twilight',
    defaultMessage: 'Twilight',
  },
  themeNight: {
    id: 'app.toolbar.theme.night',
    defaultMessage: 'Night',
  },
  themeVerdant: {
    id: 'app.toolbar.theme.verdant',
    defaultMessage: 'Verdant',
  },
  walkthrough: {
    id: 'app.toolbar.walkthrough',
    defaultMessage: 'Walkthrough',
  },
  previewMode: {
    id: 'app.toolbar.previewMode',
    defaultMessage: 'Preview mode',
  },
  preview: {
    id: 'app.toolbar.preview',
    defaultMessage: 'Preview',
  },
} as const satisfies Record<string, MessageDescriptor | PluralMessageDescriptor>

export type AppMessageKey = {
  [Key in keyof typeof appMessages]: (typeof appMessages)[Key] extends MessageDescriptor
    ? Key
    : never
}[keyof typeof appMessages]
