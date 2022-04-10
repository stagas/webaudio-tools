/**
 * SilenceDetectorNode.
 *
 * Emits `silent` when signal is producing silence for a given amount of time
 * and emits `playing` when it starts playing.
 *
 * ```ts
 * const silenceDetectorNode = new SilenceDetectorNode(ctx)
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
export class SilenceDetectorNode extends GainNode {
  /** Indicates whether there is silence or not */
  isSilent = true
  /** How much silent time in seconds in order to detect silence (default: 0.5) */
  silenceThresholdSeconds = 0.5

  /** Event callback that fires when node becomes silent */
  onsilent?(): void
  /** Event callback that fires when node receives audio */
  onplaying?(): void

  #processorNode: ScriptProcessorNode

  constructor(ctx: BaseAudioContext) {
    super(ctx)

    let detectedSilenceAt = 0
    this.#processorNode = this.context.createScriptProcessor(256, 1, 1)
    this.#processorNode.onaudioprocess = (e: AudioProcessingEvent) => {
      const data = e.inputBuffer.getChannelData(0)
      if (!this.isSilent) {
        // we just need to verify a single sample per chunk
        // because the odds of false positives surviving the silence
        // seconds threshold is basically zero
        if (data[0] === 0) {
          if (!detectedSilenceAt)
            detectedSilenceAt = this.context.currentTime
          else {
            if (this.context.currentTime - detectedSilenceAt > this.silenceThresholdSeconds) {
              this.isSilent = true
              this.onsilent?.()
              this.dispatchEvent(new CustomEvent('silent'))
            }
          }
        } else {
          detectedSilenceAt = 0
        }
      } else {
        if (data[0] !== 0) {
          detectedSilenceAt = 0
          this.isSilent = false
          this.onplaying?.()
          this.dispatchEvent(new CustomEvent('playing'))
        }
      }
    }
    this.connect(this.#processorNode)
    this.#processorNode.connect(this.context.destination)
  }
}
