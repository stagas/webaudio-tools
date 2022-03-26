import { dbToFloat } from './db'

/**
 * PeakingDetectorNode.
 *
 * ```ts
 * const peakingDetectorNode = new PeakingDetectorNode(ctx)
 * peakingDetectorNode.decibelsThreshold = -1
 * peakingDetectorNode.onpeaking = () => console.log('peaking')
 *
 * someAudioNode.connect(peakingDetectorNode)
 * // ... sometime later peaking is detected and fired once ...
 * // => console: "peaking"
 * //
 * // ... then when issue is resolved by user
 * // we make it possible to emit "peaking" event again
 * peakingDetectorNode.reset()
 * ```
 */
export class PeakingDetectorNode extends GainNode {
  /** Indicator whether node is peaking */
  isPeaking = false
  /** Decibels threshold in dBFS to emit peaking when above */
  decibelsThreshold = -1
  /** Event callback that fires when peaking is detected */
  onpeaking?(): void

  #processorNode: ScriptProcessorNode

  constructor(ctx: BaseAudioContext) {
    super(ctx)

    this.#processorNode = this.context.createScriptProcessor(256, 1, 1)
    this.#processorNode.onaudioprocess = (e: AudioProcessingEvent) => {
      if (!this.isPeaking) {
        const limit = dbToFloat(this.decibelsThreshold)
        const data = e.inputBuffer.getChannelData(0)
        const span = 64 // should be enough :)
        for (let i = 0, s = 0; i < span; i++) {
          s = data[i]
          if (s > limit || s < -limit) {
            this.isPeaking = true
            this.onpeaking?.()
            this.dispatchEvent(new CustomEvent('peaking'))
            return
          }
        }
      }
    }
    this.connect(this.#processorNode)
    this.#processorNode.connect(this.context.destination)
  }

  reset() {
    this.isPeaking = false
  }
}
