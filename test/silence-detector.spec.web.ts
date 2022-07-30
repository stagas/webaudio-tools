import { SilenceDetectorNode } from '../'

const ctx = new AudioContext()

describe('SilenceDetectorNode', () => {
  it('runs onplaying', async () => {
    const node = await SilenceDetectorNode.create(ctx)
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

  it('runs onsilence', async () => {
    const node = await SilenceDetectorNode.create(ctx)
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const gain = ctx.createGain()
    gain.gain.value = 1.0

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    gain.connect(node)
    oscillator.connect(gain)
    await onplaying
    expect(node.isSilent).toBe(false)

    const onsilent = new Promise<void>(resolve => node.onsilence = resolve)
    expect(node.isSilent).toBe(false)
    const time = ctx.currentTime
    gain.gain.value = 0.0
    await onsilent
    expect(node.isSilent).toBe(true)
    expect(ctx.currentTime - time).toBeGreaterThan(0.5)
  })

  it('runs onsilence when disconnect', async () => {
    const node = await SilenceDetectorNode.create(ctx)
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const gain = ctx.createGain()
    gain.gain.value = 1.0

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    gain.connect(node)
    oscillator.connect(gain)
    await onplaying
    expect(node.isSilent).toBe(false)

    const onsilent = new Promise<void>(resolve => node.onsilence = resolve)
    expect(node.isSilent).toBe(false)
    const time = ctx.currentTime
    oscillator.disconnect()
    await onsilent
    expect(node.isSilent).toBe(true)
    expect(ctx.currentTime - time).toBeLessThan(0.05)
  })

  it('change threshold', async () => {
    const node = await SilenceDetectorNode.create(ctx, { processorOptions: { seconds: 0.25 } })
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const gain = ctx.createGain()
    gain.gain.value = 1.0

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    gain.connect(node)
    oscillator.connect(gain)
    await onplaying
    expect(node.isSilent).toBe(false)

    const onsilent = new Promise<void>(resolve => node.onsilence = resolve)
    expect(node.isSilent).toBe(false)
    const time = ctx.currentTime
    gain.gain.value = 0.0
    await onsilent
    expect(node.isSilent).toBe(true)
    expect(ctx.currentTime - time).toBeGreaterThan(0.25)
  })

  it('runs onplaying onsilent and onplaying again', async () => {
    const node = await SilenceDetectorNode.create(ctx)
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const gain = ctx.createGain()
    gain.gain.value = 1.0

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    gain.connect(node)
    oscillator.connect(gain)
    await onplaying
    expect(node.isSilent).toBe(false)

    const onsilent = new Promise<void>(resolve => node.onsilence = resolve)
    expect(node.isSilent).toBe(false)
    const time = ctx.currentTime
    gain.gain.value = 0.0
    await onsilent
    expect(node.isSilent).toBe(true)
    expect(ctx.currentTime - time).toBeGreaterThan(0.5)

    const onplaying2 = new Promise<void>(resolve => node.onplaying = resolve)
    gain.gain.value = 1.0
    await onplaying2
    expect(node.isSilent).toBe(false)
  })

  it('runs onplaying onsilent and onplaying again using disconnect/connect', async () => {
    const node = await SilenceDetectorNode.create(ctx)
    expect(node).toBeInstanceOf(SilenceDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const gain = ctx.createGain()
    gain.gain.value = 1.0

    const onplaying = new Promise<void>(resolve => node.onplaying = resolve)
    expect(node.isSilent).toBe(true)
    gain.connect(node)
    oscillator.connect(gain)
    await onplaying
    expect(node.isSilent).toBe(false)

    const onsilent = new Promise<void>(resolve => node.onsilence = resolve)
    expect(node.isSilent).toBe(false)
    const time = ctx.currentTime
    oscillator.disconnect()
    await onsilent
    expect(node.isSilent).toBe(true)
    expect(ctx.currentTime - time).toBeLessThan(0.05)

    const onplaying2 = new Promise<void>(resolve => node.onplaying = resolve)
    oscillator.connect(gain)
    await onplaying2
    expect(node.isSilent).toBe(false)
  })
})
