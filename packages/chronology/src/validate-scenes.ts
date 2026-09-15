import { rendererKinds, type SceneRecord } from './types'

const supportedRenderers = new Set<string>(rendererKinds)

function assertScene(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

function validateTemporal(scene: SceneRecord) {
  const { startYearsBeforePresent, endYearsBeforePresent } = scene.temporal
  const hasSafeValues =
    Number.isSafeInteger(startYearsBeforePresent) && Number.isSafeInteger(endYearsBeforePresent)

  assertScene(hasSafeValues, `${scene.id}: temporal values must be safe integers`)
  assertScene(startYearsBeforePresent >= 0, `${scene.id}: temporal values cannot be negative`)
  assertScene(
    startYearsBeforePresent >= endYearsBeforePresent,
    `${scene.id}: temporal range runs backward`,
  )
}

function validateContent(scene: SceneRecord) {
  assertScene(
    supportedRenderers.has(scene.renderer),
    `${scene.id}: unsupported renderer "${scene.renderer}"`,
  )
  assertScene(scene.sources.length > 0, `${scene.id}: at least one source is required`)
  assertScene(scene.scrollWeight > 0, `${scene.id}: scroll weight must be positive`)

  const { summary, visualDescription } = scene.accessibility
  assertScene(
    summary.trim().length > 0 && visualDescription.trim().length > 0,
    `${scene.id}: accessibility content is required`,
  )
}

function validatePosition(scene: SceneRecord, index: number, previous?: SceneRecord) {
  assertScene(
    scene.order === index + 1,
    `${scene.id}: expected order ${index + 1}, received ${scene.order}`,
  )
  if (!previous) return

  assertScene(
    scene.temporal.startYearsBeforePresent <= previous.temporal.endYearsBeforePresent,
    `${scene.id}: chronology must move toward the present`,
  )
}

export function validateScenes<const T extends readonly SceneRecord[]>(scenes: T): T {
  const ids = new Set<string>()

  scenes.forEach((scene, index) => {
    assertScene(!ids.has(scene.id), `${scene.id}: duplicate scene id`)
    validatePosition(scene, index, scenes[index - 1])
    validateTemporal(scene)
    validateContent(scene)
    ids.add(scene.id)
  })

  return scenes
}

export function createChronology<const T extends readonly SceneRecord[]>(scenes: T): T {
  return validateScenes(scenes)
}
