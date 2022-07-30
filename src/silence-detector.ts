import { SilenceDetector, SilenceDetectorOptions } from './silence-detector-processor'

/**
 * SilenceDetectorNode.
 *
 * Emits `silent` when signal is producing silence for a given amount of time
 * and emits `playing` when it starts playing.
 *
 * ```ts
 * const silenceDetectorNode = await SilenceDetectorNode.create(ctx)
 * silenceDetectorNode.silenceThresholdSeconds = 0.5
 * silenceDetectorNode.onplaying = () => console.log('playing')
 * silenceDetectorNode.onsilent = () => console.log('silent')
 *
 * oscillatorNode.connect(silenceDetectorNode)
 * oscillatorNode.start() // => console: "playing"
 * ...
 * oscillatorNode.stop()
 * // ... after 0.5 seconds ...
 * // => console: "silent"
 * ```
 */
export class SilenceDetectorNode extends AudioWorkletNode {
  static hasRegistered = false

  static async register(context: BaseAudioContext) {
    if (this.hasRegistered) return
    await context.audioWorklet.addModule(
      new URL(
        './silence-detector-processor.js',
        // @ts-ignore
        import.meta.url
      ).href
    )
    this.hasRegistered = true
  }

  static async create(
    context: BaseAudioContext,
    options: AudioWorkletNodeOptions & {
      processorOptions?: Partial<SilenceDetectorOptions>
    } = {},
  ) {
    await this.register(context)
    Object.assign(options, SilenceDetector)
    const node = new this(context, options)
    return node
  }

  /** Event callback that fires when node detects silence */
  onsilence?(): void
  /** Event callback that fires when node detects audio */
  onplaying?(): void

  isSilent = true

  constructor(
    context: BaseAudioContext,
    options: AudioWorkletNodeOptions & {
      processorOptions?: Partial<SilenceDetectorOptions>
    },
  ) {
    super(context, SilenceDetector.name, options)

    this.port.onmessage = ({ data }) => {
      if (data.silence) {
        this.isSilent = true
        this.onsilence?.()
        this.dispatchEvent(new CustomEvent('silence'))
      }
      if (data.playing) {
        this.isSilent = false
        this.onplaying?.()
        this.dispatchEvent(new CustomEvent('playing'))
      }
    }
  }
}
