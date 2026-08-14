# UI Localization and Simplified Chinese

*Design for translating the complete first-party UI to Simplified Chinese while keeping locale switching lightweight, portable, and independent of scene data.*

Applies to: `apps/editor/**`, `packages/editor/**`, `packages/nodes/**`, and browser-visible copy in `packages/viewer/**`.

Status: accepted; Phase 1 runtime implemented; Phase 2 operational shell substantially implemented; registry and node coverage migration in progress.

## Decision Summary

Pascal will support two initial locales:

- `en` — English and the fallback locale.
- `zh-CN` — Simplified Chinese.

Users can switch between them at runtime without reloading the editor or changing the current scene, selection, camera, tool, or undo history. The standalone app persists the selection in a cookie. Embedders may control the locale themselves.

The implementation will use a small internal `@pascal-app/i18n` package built from React context and browser-native `Intl` APIs. It will not add `i18next`, `react-intl`, `next-intl`, an ICU runtime, or a translation service. Translation catalogs are plain TypeScript records and are bundled locally; no network request is needed to translate the UI.

The existing `@pascal-app/lingo` dependency is a measurement parser and is unrelated to UI localization.

## Goals

- Translate all first-party visible UI into Simplified Chinese.
- Switch between English and Chinese immediately, without a page reload.
- Preserve the current editing state while switching.
- Keep the localization runtime framework-independent except for a thin React provider.
- Cover visible text, tooltips, accessibility labels, empty states, dialogs, validation messages, generated reports, and floor-plan exports.
- Prevent new unlocalized UI strings through automated checks.

## Non-Goals

- Translating user-authored scene, project, room, or node names.
- Translating stable identifiers such as node kinds, enum values, JSON keys, catalog IDs, URLs, or database values.
- Renaming MCP tools, resource URIs, prompt names, JSON-RPC fields, or error codes.
- Translating arbitrary text embedded in imported models or external plugins.
- Adding locale-prefixed routes such as `/zh-CN/scenes`.
- Supporting right-to-left layout in the first release. The locale model will still carry a direction field for future use.
- Performing automatic or server-hosted translation at runtime.

## Current State

The runtime and first operational migration are implemented:

- `@pascal-app/i18n` provides English fallback, locale-keyed catalogs, interpolation, plurals, and `Intl` formatting.
- The standalone app resolves the initial locale from the `pascal-locale` cookie, then `Accept-Language`, then English.
- `<html lang>`, cookie persistence, CJK system-font fallback, and the Settings language control are wired.
- The local-editor shell, scene list, missing-scene state, create/save/conflict flows, build palette, MEP/DWV tools, and viewer toolbar are localized.
- Settings, audio settings, keyboard shortcuts, and build-import review are localized.
- Core registry types carry optional message keys beside English fallbacks without taking a runtime dependency on localization.
- Generic editor consumers resolve presentation, parametric field/option/action, helper, quick-action, tree, and quick-measurement keys.
- `packages/nodes` owns a first-party catalog. Wall is the first migrated family, including its presentation, hints, inspector fields, material slots, custom panel, measurement features, and quick-measurement report.
- Catalog parity and duplicate-ID tests cover every catalog migrated so far.

Coverage is still incomplete. The current catalogs contain 144 `app.*`, 144 `editor.*`, and 70 `nodes.*` message IDs. `packages/viewer` does not yet provide a catalog, most reusable editor workflows remain unmigrated, and 45 built-in node families still need review. Switching to Chinese therefore still produces a mixed-language interface outside the migrated surfaces; the product must not describe the UI as fully localized until the acceptance criteria in this document are met.

### Audit Snapshot — 2026-07-30

A broader source scan counted likely untranslated UI signals in non-test first-party TypeScript and TSX files:

| Surface | Files with likely copy | Attribute/object signals | Direct JSX text signals | Total signals |
|---|---:|---:|---:|---:|
| `apps/editor` | 10 | 40 | 64 | 104 |
| `packages/editor` | 71 | 288 | 99 | 387 |
| `packages/nodes` | 151 | 1,334 | 68 | 1,402 |
| `packages/viewer` | 7 | 0 | 8 | 8 |

These are migration signals, not a translation percentage. The scan includes likely presentation fields such as `label`, `description`, `title`, `placeholder`, `aria-label`, and `message`, plus direct JSX text. It can overcount technical metadata and undercount assembled sentences, arrays, callbacks, PDF/SVG output, persisted defaults, and strings returned from helper functions. Every surface still needs a human review.

The node package remains the largest gap. The figures below are the pre-migration baseline from the audit; Wall has since been migrated:

- 46 registered node presentations were English.
- 36 registry tool-hint arrays were English.
- More than 660 likely node-owned labels appear in parametric definitions and bespoke panels.
- The heaviest families are cabinet, door, column, wall, window, chimney, dormer, construction dimensions, stair, roof, and MEP/DWV nodes.

### Coverage Inventory

| Surface | Representative files | Status | Remaining work |
|---|---|---|---|
| Locale bootstrap | `app/layout.tsx`, `app/client-bootstrap.tsx`, `app/globals.css` | Foundation complete | Add automated no-remount and live-switch coverage |
| Local editor shell | `app/page.tsx` | Operational shell complete | Plugin-owned rail content and node-owned palette labels outside migrated families |
| Scene list and creation | `app/scenes/page.tsx`, `components/scenes-view.tsx`, `components/save-button.tsx` | Complete | Locale-specific route metadata |
| Saved-scene editor | `app/scene/[id]/page.tsx`, `components/scene-loader.tsx`, `components/scene-not-found.tsx` | Complete | Locale-specific route metadata |
| Standalone build and display controls | `components/build-tab.tsx`, `components/viewer-toolbar.tsx` | Complete | Continue resolving node-owned labels as their catalogs migrate |
| Legal pages | `app/privacy/page.tsx`, `app/terms/page.tsx` | Deferred | Separate reviewed legal translations and localized metadata |
| Settings | `settings-panel/index.tsx` and child dialogs | Substantial | Plugin text and validation diagnostics without stable error codes |
| Sidebar and navigation | site/items/plugins/zone panels, floating level selector | Not started | Tabs, headings, tree actions, counts, empty states, mobile labels |
| Command palette and shortcuts | command-palette files, `keyboard-shortcuts-dialog.tsx` | Partial | Command palette labels, groups, dynamic badges, and Chinese search aliases |
| Viewer and action menus | viewer controls, structure/furnish/measurement/camera actions | Not started | Modes, toggles, tooltips, accessible names, dynamic state labels |
| Inspectors and selections | parametric inspector, reference panel, node actions, mobile selection | Partial | Non-registry inspectors, warnings, references, and selection summaries |
| Help and feedback | contextual help, helper manager, walkthrough HUD, loaders/errors | Partial | Non-registry tool stages, snapping modes, walkthrough, cursor, and toast feedback |
| Materials and media | material picker/paint/properties, audio controls | Not started | Sources, slots, filters, empty states, dialog copy |
| Floor plan and output | floor-plan panels/layers, measurements, PDF/export code | Not started | View labels, annotations, generated titles, legends, warnings, PDF text |
| Built-in nodes | all `packages/nodes/src/<kind>` definitions and panels | In progress; Wall complete | Remaining 45 presentations and their hints, parametrics, panels, actions, measurements, and generated documentation |
| Standalone viewer | themes, GLB interaction fallback, GPU recovery copy | Not started | Genuine viewer-owned display names and browser-visible recovery messages |

### Definition of Surface Complete

A feature or component is complete only when all applicable states are localized:

- Default, hover, selected, disabled, loading, empty, success, warning, and error states
- Nested dialogs, popovers, menus, tooltips, placeholders, and confirmation text
- `aria-label`, `title`, `alt`, live-region, and screen-reader-only text
- Dynamic counts, dates, numbers, enum values, generated sentences, and fallback names
- Desktop, mobile, 2D, 3D, and exported/PDF variants
- English fallback and unknown-plugin behavior

Translating a panel heading or its launch button does not mark its child dialogs or workflows complete.

## Ownership and Package Boundaries

Localization follows the existing layer rules:

- `packages/core` remains locale-agnostic. It stores domain values and may carry optional presentation message keys, but it does not choose a locale, import React, or translate strings.
- `packages/viewer` may use `@pascal-app/i18n` only for its own genuine viewer UI. It must not import editor catalogs or editor state.
- `packages/editor` owns translations for the reusable editing experience.
- `packages/nodes` owns translations for built-in node definitions, panels, actions, tool hints, and generated node documentation.
- `apps/editor` owns standalone navigation, scene-management pages, local-editor banners, errors, metadata, legal pages, and locale persistence.
- External plugins own their catalogs. Missing plugin translations fall back to their supplied English text.

Scene data never depends on the current locale. Switching languages must not call `useScene`, create commits, dirty nodes, or affect persistence.

Core validation and domain failures that cross into UI must expose a stable error code and structured values. The owning UI package translates known codes and may display the original English diagnostic only as a fallback. Core must not read the active locale or return already-localized errors.

## Proposed Runtime

Create a small `packages/i18n` workspace package containing message types, the React provider, locale validation, and `Intl` formatters. Its public API should remain small:

```ts
export type SupportedLocale = 'en' | 'zh-CN'

export type MessageDescriptor = { id: string; defaultMessage: string }
export type PluralMessageDescriptor = {
  id: string
  defaultMessage: { one: string; other: string }
}
export type MessageCatalog = Readonly<
  Record<string, string | { one?: string; other: string }>
>
export type LocaleCatalogs = Partial<
  Record<SupportedLocale, readonly MessageCatalog[]>
>

export function I18nProvider(props: {
  locale: SupportedLocale
  catalogs?: LocaleCatalogs
  onLocaleChange?: (locale: SupportedLocale) => void
  children: React.ReactNode
}): React.ReactNode

export function useI18n(): {
  locale: SupportedLocale
  canChangeLocale: boolean
  setLocale: (locale: SupportedLocale) => void
  t: (message: MessageDescriptor, values?: Record<string, string | number>) => string
  tPlural: (
    message: PluralMessageDescriptor,
    count: number,
    values?: Record<string, string | number>,
  ) => string
  formatNumber: (value: number) => string
  formatDate: (value: Date | string | number) => string
}
```

Each message has a stable ID and English fallback. The Chinese catalog overrides it by ID:

```ts
export const editorMessages = {
  delete: { id: 'editor.actions.delete', defaultMessage: 'Delete' },
  sceneCount: {
    id: 'editor.scenes.count',
    defaultMessage: { one: '{count} scene', other: '{count} scenes' },
  },
} as const satisfies Record<string, MessageDescriptor | PluralMessageDescriptor>

export const editorZhCN = {
  'editor.actions.delete': '删除',
  'editor.scenes.count': '{count} 个场景',
} as const satisfies MessageCatalogFor<typeof editorMessages>
```

```tsx
const { t } = useI18n()
return <Button aria-label={t(editorMessages.delete)}>{t(editorMessages.delete)}</Button>
```

If there is no provider, no catalog, or no matching key, `t` returns `defaultMessage`. This preserves the existing English behavior for package consumers and third-party plugins. `canChangeLocale` is false without a provider or when the provider has no `onLocaleChange`; reusable language controls stay hidden in that case instead of presenting an inert switch.

### Catalog Ownership

Each UI-owning package keeps `messages.ts` and `zh-CN.ts` catalogs with its source: `apps/editor/i18n`, `packages/editor/src/i18n`, and `packages/nodes/src/i18n`.

The standalone app passes all first-party catalogs to one root provider, grouped by locale. Catalogs are never supplied as one unlabelled list: doing so would let a Chinese catalog override English while English is active. Namespaced IDs prevent collisions:

- `app.*`
- `editor.*`
- `nodes.*`
- `viewer.*`
- `plugin.<plugin-id>.*`

Catalogs remain ordinary objects so an embedder can replace, extend, lazy-load, or serialize them without depending on Next.js.

### Interpolation and Plurals

The runtime supports named interpolation such as `{count}`, `{name}`, and `{shortcut}`. It must escape values by relying on normal React text rendering; translations do not contain HTML.

Plural selection uses `Intl.PluralRules` and `tPlural` with explicit descriptors rather than a full ICU parser. Callers provide `one` and `other` English variants where required. Chinese normally resolves to a single catalog string. Interpolated numeric values are formatted with the active locale.

Numbers and dates use `Intl.NumberFormat` and `Intl.DateTimeFormat`. Dates rendered during SSR must use an explicit time zone or be formatted after hydration so server and browser time zones cannot produce different text. Measurement semantics do not change:

- Scene values remain stored in metres and radians.
- Unit symbols such as `m`, `m²`, `mm`, and `°` remain technical symbols.
- Decimal separators and dates follow the selected UI locale.
- Keyboard keycaps such as `Esc`, `Shift`, `Cmd`, `Ctrl`, `R`, and `T` remain literal keys; their surrounding explanations are translated.

## Locale Resolution and Switching

The standalone app resolves the initial locale in this order:

1. A valid `pascal-locale` cookie.
2. The request `Accept-Language` header.
3. English.

`apps/editor/app/layout.tsx` passes the resolved locale into `ClientBootstrap` and sets the initial `<html lang>` value. This avoids rendering English and immediately replacing it with Chinese during hydration.

The provider exposes `setLocale`. The standalone adapter responds by:

1. Updating provider state.
2. Setting `document.documentElement.lang`.
3. Writing `pascal-locale=en` or `pascal-locale=zh-CN`.

The active React tree rerenders, but the editor itself does not remount. Locale must therefore not be used as an `Editor`, `Viewer`, or canvas `key`.

Server components that currently own visible text should be split:

- Keep data fetching in the server component.
- Pass data into a small client view that reads the locale context.

This applies particularly to `/scenes` and `/scene/[id]`. Legal pages may either use the same client-view pattern or select a reviewed static document on the server. Metadata should use the request locale on the next navigation; switching the live page does not require a route change.

## Language Control

Add a `Language` row to the existing settings panel with two options:

- `English`
- `简体中文`

The selected language name is written in its own language so users can recover after accidentally switching. The control must be available on desktop and mobile.

Changing it must preserve:

- Current scene and unsaved edits
- Selection and active level
- Camera position and view mode
- Active tool, unless that tool already closes for another reason
- Undo and redo history
- Open panel and panel scroll position where practical

## What Must Be Translated

### Standalone App

- Navigation, page titles, banners, buttons, scene cards, empty states, and 404/error pages
- Scene counts, node counts, save states, and dates
- `title`, `description`, and other visible metadata where locale-specific metadata is supported
- Privacy Policy and Terms of Service, after legal review

### Reusable Editor

- Sidebar tabs and headings
- Toolbars and view modes
- Commands and keyboard-shortcut descriptions
- Dialogs, confirmations, warnings, validation messages, and empty states
- Inspector labels, controls, placeholders, and option names
- Tooltips, `title`, `aria-label`, image `alt`, and screen-reader-only content
- Camera instructions, contextual help, walkthrough HUD, and cursor feedback
- Material, audio, import/export, floor-plan, and snapshot controls
- Generated PDF and floor-plan presentation labels

### Built-In Nodes

- Registry presentation labels and descriptions
- Palette sections and tool hints
- Parametric group, field, option, and action labels
- Custom panel sections and buttons
- Measurement feature names and quick-measurement summaries
- Generated room, opening, and construction-documentation labels
- Built-in catalog category and display names

### Dynamic Content Rules

Translate display text by stable semantic ID, never by mutating the value:

| Value | Stored/API value | Chinese display example |
|---|---|---|
| Node kind | `wall` | 墙体 |
| View mode | `cutaway` | 剖切 |
| Catalog item ID | `coffee-table` | 茶几 |
| Enum | `double-hung` | 双悬窗 |

Do not translate `node.name` when it is supplied by the user or imported data. For code that currently renders `node.name || 'Wall'`, translate only the fallback `Wall`.

Existing scenes may contain persisted English default names. The first release will not guess whether those names were generated or authored. A future schema may distinguish a generated name token from a user-authored name, but that is not required for UI localization.

## Registry-Driven UI

Several UI strings originate in `packages/nodes` definitions but are rendered generically by `packages/editor`. `packages/core` should not translate them.

Optional message-key fields now sit beside registry-owned English fallbacks. The type system has more localization-bearing fields than the initial proposal accounted for:

```ts
type ToolHint = {
  key: string
  keyLabelKey?: string
  label: string
  labelKey?: string
  chip?: {
    labels: Record<string, string>
    labelKeys?: Record<string, string>
    tooltip?: string
    tooltipKey?: string
  }
}

type ParamGroup<N> = {
  label: string
  labelKey?: string
  fields: ParamField<N>[]
}

type ParamAction<N> = {
  label: string
  labelKey?: string
  // existing fields
}

type ParamFieldPresentation = {
  label?: string
  labelKey?: string
}

type EnumFieldPresentation = ParamFieldPresentation & {
  options: readonly string[]
  optionLabels?: Readonly<Record<string, string>>
  optionLabelKeys?: Readonly<Record<string, string>>
}

type NodePresentation = {
  label: string
  labelKey?: string
  description?: string
  descriptionKey?: string
  // existing fields
}

type NodeQuickAction = {
  label: string
  labelKey?: string
  title?: string
  titleKey?: string
  // existing fields
}

type SlotDeclaration = {
  slotId: string
  label: string
  labelKey?: string
  // existing fields
}

type MeasurementFeature = {
  id: string
  label: string
  labelKey?: string
  // existing fields
}

type Issue = {
  code?: string
  values?: Record<string, string | number>
  msg: string
  // existing fields
}
```

Core carries these optional keys and structured error metadata but never interprets them. Migrated generic editor renderers resolve message keys through the active catalog and fall back to the adjacent English field. Existing third-party definitions continue to work unchanged.

Where a type is awkward to extend, built-in definitions may store message-key metadata in their existing opaque `extensions` object. Directly translating the English label text is not allowed because identical English words can require different translations in different contexts.

The parametric inspector, registry tree, palette, helper HUD, 2D/3D quick-action menus, and quick-measurement card now resolve registry message keys. The remaining generic consumers must migrate before their associated node catalogs:

- Material-slot UI, floor-plan mode, and other measurement UI must resolve their corresponding keys.
- `paletteSection`, node kinds, enum tokens, field keys, action IDs, feature IDs, and slot IDs remain stable untranslated values.
- Mouse inputs such as “Left click” and “Right click” now have localized display labels; physical keycaps such as `Esc`, `Shift`, `R`, and `T` remain literal.
- Command-palette labels and groups must be translated, while search keeps English keywords and adds Chinese aliases so either language can find a command.

## Simplified Chinese Style Guide

Use concise Mainland Simplified Chinese appropriate for an architectural editor:

| English | Preferred Chinese |
|---|---|
| Scene | 场景 |
| Site | 场地 |
| Building | 建筑 |
| Level | 楼层 |
| Wall | 墙体 |
| Door | 门 |
| Window | 窗 |
| Room | 房间 |
| Zone | 区域 |
| Slab | 楼板 |
| Ceiling | 顶棚 |
| Roof | 屋顶 |
| Stair | 楼梯 |
| Floor plan | 平面图 |
| Build tab / modeling tools | 建模 |
| Build / create action | 创建 |
| Item | 物件 |
| Column | 柱 |
| Shelf | 搁板 |
| Spawn point | 漫游起点 |
| Move | 移动 |
| Duplicate | 复制 |
| Delete | 删除 |
| Cutaway | 剖切 |
| Exploded | 分解 |
| Dimensions | 尺寸标注 |
| Settings | 设置 |
| Scene graph | 场景图 |
| Split view | 分屏 |
| Full height | 全高 |
| Reference image | 参考图 |
| MEP | 机电 |
| Duct | 风管 |
| Register (HVAC) | 风口 |
| HVAC equipment | 暖通设备 |
| Lineset | 制冷剂管组 |
| Liquid line | 液管 |
| DWV pipe | 排水通气管 |

Translation rules:

- Prefer short action verbs on buttons.
- Preserve Pascal as a product name.
- Use Chinese punctuation in sentences and English punctuation in code, paths, and technical identifiers.
- Keep abbreviations and industry-standard units when translating would reduce clarity.
- Translate the meaning of tooltips rather than mirroring English word order.
- Use the same glossary across the editor, node panels, exports, and documentation.
- Have an architect or native technical reviewer approve ambiguous construction terms before release.
- Translate by domain context: HVAC “Register” is `风口`, never the software-account verb `注册`.
- Prefer established CAD/BIM vocabulary over literal consumer-language translations. For example, the editor's “Build” tab is `建模`, while a sentence about physical construction may use `建造`.
- Treat the current partial catalog as provisional where it conflicts with this reviewed glossary; correct those entries in the next catalog migration.

## Typography and Layout

Do not bundle a CJK webfont. CJK font files are large and would work against the lightweight requirement.

Extend the application font stack so Chinese falls back to installed system fonts:

```css
font-family: var(--font-geist-sans), "PingFang SC", "Microsoft YaHei",
  "Noto Sans CJK SC", system-ui, sans-serif;
```

Validate:

- Sidebar widths and truncated tree rows
- Segmented controls and narrow buttons
- Tooltips and dialogs
- Mobile bottom sheets and selection bars
- PDF and floor-plan SVG labels
- Mixed Chinese, numbers, units, and Latin identifiers

Components should prefer flexible widths and intentional ellipsis over locale-specific fixed widths.

## Migration Plan

### Phase 1 — Runtime Foundation

- [x] Add `@pascal-app/i18n`.
- [x] Implement provider, fallback behavior, interpolation, plural selection, and `Intl` formatters.
- [x] Add catalog parity and duplicate-key tests.
- [x] Add the root provider and locale resolution to `apps/editor`.
- [x] Add the Settings language control.
- [x] Add CJK system-font fallback without a webfont.
- [ ] Add a component test proving that switching does not remount the editor or reset UI state.
- [ ] Add a browser test for persistence, `<html lang>`, and desktop/mobile switching.

Exit criterion: a small set of app and editor strings switches immediately and persists across refreshes.

### Phase 2 — Standalone App Shell

- [x] Finish the main editor route instead of counting translated tabs as route completion.
- [x] Translate the scene list, saved-scene route, banners, save/create controls, conflicts, and errors.
- [x] Translate `BuildTab` and `viewer-toolbar` as operational shell surfaces.
- [x] Extract translated client views from server data loaders where needed.
- [ ] Verify route metadata uses the resolved locale.
- [x] Verify browser-visible fallback pages use the resolved locale.
- [x] Replace default-locale date and number formatting.
- [x] Correct provisional glossary mismatches, including the Build tab's `建造` translation to `建模`.

Exit criterion: all non-editor-shell routes except legal documents pass the untranslated-string audit.

### Phase 3 — Reusable Editor UI

Migrate by surface so reviews stay small:

1. Finish Settings child dialogs and import/error states.
2. Sidebar/site/items/plugins/zone panels and level navigation.
3. Viewer controls and structure/furnish/measurement/camera action menus.
4. Command palette, command groups, badges, shortcuts, and bilingual search keywords.
5. Registry metadata types plus generic consumers: presentation, parametric fields/options/actions, hints, quick actions, slots, measurements, and issues.
6. Shared inspector primitives, selection actions, references, materials, dialogs, loaders, errors, and contextual help.
7. Floor-plan, measurements, snapshots, exports, generated PDF text, and mobile-only controls.

Exit criterion: `packages/editor` has no unapproved user-facing English literals.

### Phase 4 — Built-In Node UI

- [x] Establish the `nodes.*` catalog and migrate Wall as the first end-to-end family.
- Extend message keys to the remaining 45 registered presentations and their tool-hint sets.
- Translate shared node-panel controls and generated documentation helpers first.
- Migrate high-volume families first: cabinet; door/window; column; wall; roof/dormer/chimney/accessories; stair/elevator; zone/construction dimensions.
- Migrate MEP/DWV families as a terminology-reviewed batch so duct, register, equipment, lineset, liquid line, pipe, fitting, and trap remain consistent.
- Migrate the remaining node folders, including custom panels, enum option labels, quick actions, slots, tool hints, and validation issues.
- Translate catalog display names by stable catalog item ID.
- Translate generated measurement and construction-documentation copy.

Exit criterion: every built-in node kind renders its palette entry, inspector, actions, hints, and generated labels in Chinese.

### Phase 5 — Long-Form and External Surfaces

- Translate Privacy Policy and Terms of Service.
- Obtain legal and native-language review before presenting them as authoritative.
- Document how plugins provide namespaced catalogs.
- Review browser-visible viewer errors and plugin fallbacks.

Exit criterion: every first-party route and supported built-in plugin surface is translated or explicitly allowlisted.

### Phase 6 — Enforcement and Cleanup

- Enable the UI-literal check as a required CI step.
- Remove the temporary migration allowlist.
- Add screenshot coverage for English and Chinese desktop/mobile states.
- Record final catalog size and confirm the bundle budget.

## Testing and Enforcement

### Unit Tests

- Locale validation and resolution order
- English fallback when a provider or key is missing
- Chinese catalog lookup
- Interpolation and plural selection
- Number and date formatting
- Catalog key parity and duplicate IDs
- Registry label-key fallback for third-party definitions

### Component Tests

- Switching language rerenders visible and accessible text
- Input values, focus, open dialogs, and selection remain intact
- Tooltips, placeholders, errors, and `aria-label` values switch
- Unknown plugin strings remain readable in English

### End-to-End and Visual Tests

Test representative desktop and mobile viewports in Chromium, Firefox, and WebKit:

- Main editor with each sidebar tab
- Settings language switch
- Node inspector and action menu
- Command palette and shortcut dialog
- Scene list and missing-scene page
- Floor-plan view and exported PDF
- Long Chinese labels in narrow mobile controls

The Chinese run must fail when first-party English UI text appears outside an explicit allowlist. The allowlist may contain product names, keycaps, unit symbols, file formats, and deliberate technical identifiers.

### Source Audit

Add a repository script under `tooling/i18n` that scans first-party UI files for likely raw copy:

- JSX text children
- `label`, `title`, `placeholder`, `aria-label`, and `alt`
- Toast, error, and validation messages
- Registry presentation strings
- Option arrays and generated sentences

False positives are handled by a reviewed allowlist with a reason. The baseline allowlist must shrink during migration and must not become a permanent substitute for translation.

The audit output must group findings by the coverage inventory above and report both file count and signal count. It must not publish a single misleading “percent translated” number. A surface checklist records manual review of states the source scan cannot prove, including hover text, runtime-generated copy, canvas overlays, PDF output, and mobile-only UI.

## Resource Budget

- No third-party localization runtime.
- Runtime target: less than 3 KB gzipped, excluding catalogs.
- Simplified Chinese catalog target: less than 35 KB gzipped.
- No CJK webfont.
- No translation API calls.
- No extra server, database table, or per-scene locale field.
- Locale switching should perform only a React context update and text rerender.

These costs are negligible relative to the editor's React and 3D bundles and do not materially change the one-CPU/one-GB development deployment profile.

## Acceptance Criteria

- English and Simplified Chinese can be switched from Settings on desktop and mobile.
- Switching is immediate and does not reload or reset the editor.
- The choice survives refreshes and new tabs in the standalone app.
- `<html lang>` reflects the active locale.
- All first-party operational UI is translated, including accessibility text and error states.
- No migrated operational surface mixes Chinese chrome with first-party English child controls outside the explicit technical-term allowlist.
- Built-in node panels and registry-driven labels are translated.
- Dates and numbers follow the chosen locale while scene units and stored values remain unchanged.
- User content, JSON, node kinds, enums, and MCP protocol identifiers are not modified.
- Missing third-party translations fall back to readable English.
- Legal translations are reviewed before release.
- CI prevents new unlocalized first-party UI copy.
- Runtime and catalog bundle budgets are met.

## Risks

| Risk | Mitigation |
|---|---|
| Hidden strings remain in rarely used node panels | Automated source audit plus per-node migration checklist |
| A translated parent panel hides English child dialogs | Track completion by workflow and nested state, not by component heading |
| Raw field keys and enum tokens are prettified into English | Add explicit field and option message keys; keep prettification as English fallback only |
| Command search becomes worse after labels are translated | Keep English keywords and add Chinese search aliases |
| Locale switch remounts WebGL or loses editing state | Keep locale above the app tree; never key `Editor` or `Viewer` by locale |
| English source text is used as a lookup key | Require stable namespaced message IDs |
| Persisted node names are accidentally translated | Translate only presentation fallbacks and stable display mappings |
| Third-party plugins lack Chinese catalogs | English fallback is mandatory and plugin catalogs are optional |
| Chinese glyphs trigger a large font download | Use system CJK fallback fonts |
| Legal wording changes meaning | Require separate legal/native review |
| Generic registry UI cannot locate a translation | Carry optional message keys beside existing English presentation fields |

## Recommended Delivery Shape

Implement this as a sequence of reviewable pull requests:

1. Runtime, provider, persistence, and one working language switch — implemented
2. Standalone operational shell, scenes routes, Settings dialogs, toolbars, and commands
3. Registry metadata contracts and generic editor consumers
4. Built-in node catalogs in reviewed feature-family batches
5. Floor-plan/PDF output, accessibility audit, legal content, and CI enforcement

The architecture is small; the main cost is translation coverage and verification across the large built-in node UI.
