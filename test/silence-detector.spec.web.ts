import { SilenceDetectorNode } from '../src/silence-detector'

const ctx = new AudioContext()

describe('SilenceDetectorNode', () => {
  it('runs onplaying', async () => {
    const node = new SilenceDetectorNode(ctx)
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    oscillator.connect(node)
    await onplaying
    expect(node.isSilent).toBe(false)
  })

  it('runs onsilent', async () => {
    const node = new SilenceDetectorNode(ctx)
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    oscillator.connect(node)
    await onplaying
    expect(node.isSilent).toBe(false)

    const onsilent = new Promise<void>(resolve => node.onsilent = resolve)
    expect(node.isSilent).toBe(false)
    const time = ctx.currentTime
    oscillator.disconnect()
    await onsilent
    expect(node.isSilent).toBe(true)
    expect(node.silenceThresholdSeconds).toBe(0.5)
    expect(ctx.currentTime - time).toBeGreaterThan(node.silenceThresholdSeconds)
  })

  it('change threshold', async () => {
    const node = new SilenceDetectorNode(ctx)
    node.silenceThresholdSeconds = 0.25
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    oscillator.connect(node)
    await onplaying
    expect(node.isSilent).toBe(false)

    const onsilent = new Promise<void>(resolve => node.onsilent = resolve)
    expect(node.isSilent).toBe(false)
    const time = ctx.currentTime
    oscillator.disconnect()
    await onsilent
    expect(node.isSilent).toBe(true)
    expect(node.silenceThresholdSeconds).toBe(0.25)
    expect(ctx.currentTime - time).toBeGreaterThan(node.silenceThresholdSeconds)
  })

  it('runs onplaying onsilent and onplaying again', async () => {
    const node = new SilenceDetectorNode(ctx)
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    oscillator.connect(node)
    await onplaying
    expect(node.isSilent).toBe(false)

    const onsilent = new Promise<void>(resolve => node.onsilent = resolve)
    expect(node.isSilent).toBe(false)
    const time = ctx.currentTime
    oscillator.disconnect()
    await onsilent
    expect(node.isSilent).toBe(true)
    expect(node.silenceThresholdSeconds).toBe(0.5)
    expect(ctx.currentTime - time).toBeGreaterThan(node.silenceThresholdSeconds)

    const onplaying2 = new Promise<void>(resolve => node.onplaying = resolve)
    oscillator.connect(node)
    await onplaying2
    expect(node.isSilent).toBe(false)
  })
})
