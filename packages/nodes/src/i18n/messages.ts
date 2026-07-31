import type { MessageDescriptor } from '@pascal-app/i18n'

export const nodesMessages = {
  wall: {
    id: 'nodes.wall.label',
    defaultMessage: 'Wall',
  },
  wallDescription: {
    id: 'nodes.wall.description',
    defaultMessage:
      'A straight or curved wall segment. Hosts doors, windows, and wall-mounted items.',
  },
  wallSetStartEnd: {
    id: 'nodes.wall.hints.setStartEnd',
    defaultMessage: 'Set wall start / end',
  },
  cancel: {
    id: 'nodes.common.cancel',
    defaultMessage: 'Cancel',
  },
  dimensions: {
    id: 'nodes.common.dimensions',
    defaultMessage: 'Dimensions',
  },
  thickness: {
    id: 'nodes.common.thickness',
    defaultMessage: 'Thickness',
  },
  height: {
    id: 'nodes.common.height',
    defaultMessage: 'Height',
  },
  curveOffset: {
    id: 'nodes.wall.fields.curveOffset',
    defaultMessage: 'Curve offset',
  },
  wallStart: {
    id: 'nodes.wall.measurement.start',
    defaultMessage: 'Wall start',
  },
  wallEnd: {
    id: 'nodes.wall.measurement.end',
    defaultMessage: 'Wall end',
  },
  wallCenterline: {
    id: 'nodes.wall.measurement.centerline',
    defaultMessage: 'Wall centerline',
  },
  wallMidpoint: {
    id: 'nodes.wall.measurement.midpoint',
    defaultMessage: 'Wall midpoint',
  },
  wallArcCenter: {
    id: 'nodes.wall.measurement.arcCenter',
    defaultMessage: 'Wall arc center',
  },
  wallFace: {
    id: 'nodes.wall.measurement.face',
    defaultMessage: 'Wall face',
  },
  wallHeight: {
    id: 'nodes.wall.measurement.height',
    defaultMessage: 'Wall height',
  },
  wallTop: {
    id: 'nodes.wall.measurement.top',
    defaultMessage: 'Wall top',
  },
  length: {
    id: 'nodes.common.measurement.length',
    defaultMessage: 'Length',
  },
  surfaceArea: {
    id: 'nodes.common.measurement.surfaceArea',
    defaultMessage: 'Surface',
  },
  grossFaceAreaNote: {
    id: 'nodes.wall.measurement.grossFaceAreaNote',
    defaultMessage: 'Gross face area before openings.',
  },
  interior: {
    id: 'nodes.wall.slots.interior',
    defaultMessage: 'Interior',
  },
  exterior: {
    id: 'nodes.wall.slots.exterior',
    defaultMessage: 'Exterior',
  },
  lowerBandInterior: {
    id: 'nodes.wall.slots.lowerBandInterior',
    defaultMessage: 'Lower band (interior)',
  },
  middleBandInterior: {
    id: 'nodes.wall.slots.middleBandInterior',
    defaultMessage: 'Middle band (interior)',
  },
  upperBandInterior: {
    id: 'nodes.wall.slots.upperBandInterior',
    defaultMessage: 'Upper band (interior)',
  },
  topBandInterior: {
    id: 'nodes.wall.slots.topBandInterior',
    defaultMessage: 'Top band (interior)',
  },
  lowerBandExterior: {
    id: 'nodes.wall.slots.lowerBandExterior',
    defaultMessage: 'Lower band (exterior)',
  },
  middleBandExterior: {
    id: 'nodes.wall.slots.middleBandExterior',
    defaultMessage: 'Middle band (exterior)',
  },
  upperBandExterior: {
    id: 'nodes.wall.slots.upperBandExterior',
    defaultMessage: 'Upper band (exterior)',
  },
  topBandExterior: {
    id: 'nodes.wall.slots.topBandExterior',
    defaultMessage: 'Top band (exterior)',
  },
  skirtingInterior: {
    id: 'nodes.wall.slots.skirtingInterior',
    defaultMessage: 'Skirting (interior)',
  },
  skirtingExterior: {
    id: 'nodes.wall.slots.skirtingExterior',
    defaultMessage: 'Skirting (exterior)',
  },
  crownInterior: {
    id: 'nodes.wall.slots.crownInterior',
    defaultMessage: 'Crown (interior)',
  },
  crownExterior: {
    id: 'nodes.wall.slots.crownExterior',
    defaultMessage: 'Crown (exterior)',
  },
  chairRailInterior: {
    id: 'nodes.wall.slots.chairRailInterior',
    defaultMessage: 'Chair rail (interior)',
  },
  chairRailExterior: {
    id: 'nodes.wall.slots.chairRailExterior',
    defaultMessage: 'Chair rail (exterior)',
  },
  base: {
    id: 'nodes.wall.panel.base',
    defaultMessage: 'Base',
  },
  followsLevel: {
    id: 'nodes.wall.panel.followsLevel',
    defaultMessage: 'Follows level',
  },
  fixed: {
    id: 'nodes.wall.panel.fixed',
    defaultMessage: 'Fixed',
  },
  extendsToTerrain: {
    id: 'nodes.wall.panel.extendsToTerrain',
    defaultMessage: 'Extends downward to meet the terrain. Height and top stay unchanged.',
  },
  curve: {
    id: 'nodes.wall.panel.curve',
    defaultMessage: 'Curve',
  },
  skirting: {
    id: 'nodes.wall.panel.skirting',
    defaultMessage: 'Skirting',
  },
  crownMolding: {
    id: 'nodes.wall.panel.crownMolding',
    defaultMessage: 'Crown molding',
  },
  chairRail: {
    id: 'nodes.wall.panel.chairRail',
    defaultMessage: 'Chair rail',
  },
  actions: {
    id: 'nodes.common.actions',
    defaultMessage: 'Actions',
  },
  wallBands: {
    id: 'nodes.wall.panel.wallBands',
    defaultMessage: 'Wall bands',
  },
  bands: {
    id: 'nodes.wall.panel.bands',
    defaultMessage: 'Bands',
  },
  lower: {
    id: 'nodes.wall.panel.lower',
    defaultMessage: 'Lower',
  },
  middle: {
    id: 'nodes.wall.panel.middle',
    defaultMessage: 'Middle',
  },
  upper: {
    id: 'nodes.wall.panel.upper',
    defaultMessage: 'Upper',
  },
  hideTrim: {
    id: 'nodes.wall.panel.hideTrim',
    defaultMessage: 'Hide {trim}',
  },
  showTrim: {
    id: 'nodes.wall.panel.showTrim',
    defaultMessage: 'Show {trim}',
  },
  both: {
    id: 'nodes.common.both',
    defaultMessage: 'Both',
  },
  profileFlat: {
    id: 'nodes.wall.trim.profile.flat',
    defaultMessage: 'Flat',
  },
  profileModern: {
    id: 'nodes.wall.trim.profile.modern',
    defaultMessage: 'Modern',
  },
  profileColonial: {
    id: 'nodes.wall.trim.profile.colonial',
    defaultMessage: 'Colonial',
  },
  profileShoe: {
    id: 'nodes.wall.trim.profile.shoe',
    defaultMessage: 'Shoe',
  },
  profileOgee: {
    id: 'nodes.wall.trim.profile.ogee',
    defaultMessage: 'Ogee',
  },
  profileCove: {
    id: 'nodes.wall.trim.profile.cove',
    defaultMessage: 'Cove',
  },
  profileCraft: {
    id: 'nodes.wall.trim.profile.craft',
    defaultMessage: 'Craft',
  },
  profileLayered: {
    id: 'nodes.wall.trim.profile.layered',
    defaultMessage: 'Layered',
  },
  profileRound: {
    id: 'nodes.wall.trim.profile.round',
    defaultMessage: 'Round',
  },
  profilePicture: {
    id: 'nodes.wall.trim.profile.picture',
    defaultMessage: 'Picture',
  },
  profileStep: {
    id: 'nodes.wall.trim.profile.step',
    defaultMessage: 'Step',
  },
  proud: {
    id: 'nodes.wall.panel.proud',
    defaultMessage: 'Proud',
  },
  offset: {
    id: 'nodes.wall.panel.offset',
    defaultMessage: 'Offset',
  },
} as const satisfies Record<string, MessageDescriptor>

export type NodesMessageKey = keyof typeof nodesMessages
