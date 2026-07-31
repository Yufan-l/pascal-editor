import {
  getWallCurveFrameAt,
  getWallCurveLength,
  getWallThickness,
  type QuickMeasurementReport,
  useScene,
  type WallNode,
} from '@pascal-app/core'
import { resolveWallOpeningCeiling } from '../shared/wall-opening-ceiling'

export function wallQuickMeasurement(node: WallNode): QuickMeasurementReport {
  const length = getWallCurveLength(node)
  const height = resolveWallOpeningCeiling(node, useScene.getState().nodes)
  const frame = getWallCurveFrameAt(node, 0.5)

  return {
    title: node.name ?? 'Wall',
    ...(node.name ? {} : { titleKey: 'nodes.wall.label' }),
    kindLabel: 'Wall',
    kindLabelKey: 'nodes.wall.label',
    anchor: [frame.point.x, height * 0.55, frame.point.y],
    metrics: [
      {
        key: 'length',
        label: 'Length',
        labelKey: 'nodes.common.measurement.length',
        abbreviation: 'L',
        quantity: 'length',
        value: length,
      },
      {
        key: 'height',
        label: 'Height',
        labelKey: 'nodes.common.height',
        abbreviation: 'H',
        quantity: 'length',
        value: height,
      },
      {
        key: 'surface',
        label: 'Surface',
        labelKey: 'nodes.common.measurement.surfaceArea',
        abbreviation: 'A',
        quantity: 'area',
        value: length * height,
      },
      {
        key: 'thickness',
        label: 'Thickness',
        labelKey: 'nodes.common.thickness',
        abbreviation: 'T',
        quantity: 'length',
        value: getWallThickness(node),
      },
    ],
    note: 'Gross face area before openings.',
    noteKey: 'nodes.wall.measurement.grossFaceAreaNote',
  }
}
