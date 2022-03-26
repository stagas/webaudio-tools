import { dbToFloat } from '../src/db'
import { PeakingDetectorNode } from '../src/peaking-detector'

const ctx = new AudioContext()

describe('PeakingDetectorNode', () => {
  it('runs onpeaking', async () => {
    const node = new PeakingDetectorNode(ctx)
    expect(node).toBeInstanceOf(PeakingDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const onpeaking = new Promise<void>(resolve => node.onpeaking = resolve)
    expect(node.isPeaking).toBe(false)
    oscillator.connect(node)
    await onpeaking
    expect(node.isPeaking).toBe(true)
  })

  it('does not run when below threshold', async () => {
    const node = new PeakingDetectorNode(ctx)
    expect(node).toBeInstanceOf(PeakingDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()
    const gain = ctx.createGain()
    gain.gain.value = dbToFloat(-1)
    oscillator.connect(gain)

    const onpeaking = new Promise<void>(resolve => node.onpeaking = resolve)
    expect(node.isPeaking).toBe(false)
    gain.connect(node)
    await Promise.race([onpeaking, new Promise(resolve => setTimeout(resolve, 500))])
    expect(node.isPeaking).toBe(false)
  })

  it('can be reset', async () => {
    const node = new PeakingDetectorNode(ctx)
    expect(node).toBeInstanceOf(PeakingDetectorNode)

    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.start()

    const onpeaking = new Promise<void>(resolve => node.onpeaking = resolve)
    expect(node.isPeaking).toBe(false)
    oscillator.connect(node)
    await onpeaking
    expect(node.isPeaking).toBe(true)
    const onpeaking2 = new Promise<void>(resolve => node.onpeaking = resolve)
    node.reset()
    expect(node.isPeaking).toBe(false)
    await onpeaking2
    expect(node.isPeaking).toBe(true)
  })
})
