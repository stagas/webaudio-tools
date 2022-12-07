export const SilenceDetector = {
  name: 'silence-detector',
  channelCount: 1,
  channelCountMode: 'clamped-max',
  channelInterpretation: 'speakers',
  numberOfInputs: 1,
  numberOfOutputs: 0,
} as AudioWorkletNodeOptions & { name: string }

export type SilenceDetectorOptions = {
  seconds?: number
}

if (typeof AudioWorkletProcessor !== 'undefined') {
  class SilenceDetectorProcessor extends AudioWorkletProcessor {
    private isSilent = true
    private seconds = 0.5
    private detectedSilenceAt = 0

    constructor(
      options: AudioWorkletNodeOptions & {
        processorOptions?: Partial<SilenceDetectorOptions>
      },
    ) {
      super()
      this.seconds = options.processorOptions?.seconds ?? this.seconds
    }

    process(inputs: Float32Array[][]) {
      const data = inputs[0][0]

      if (!data) {
        if (!this.isSilent) {
          this.isSilent = true
          this.port.postMessage({ silence: true })
        }
        return true
      }

      if (!this.isSilent) {
        // we just need to verify a single sample per chunk
        // because the odds of false positives surviving the silence
        // seconds threshold is basically zero
        if (data[0] === 0) {
          if (!this.detectedSilenceAt)
            this.detectedSilenceAt = currentTime
          else {
            if (currentTime - this.detectedSilenceAt > this.seconds) {
              this.isSilent = true
              this.port.postMessage({ silence: true })
            }
          }
        } else {
          this.detectedSilenceAt = 0
        }
      } else {
        if (data[0] !== 0) {
          this.detectedSilenceAt = 0
          this.isSilent = false
          this.port.postMessage({ playing: true })
        }
      }

      return true
    }
  }

  registerProcessor(SilenceDetector.name, SilenceDetectorProcessor)
}
