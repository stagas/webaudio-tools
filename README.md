<h1>
webaudio-tools <a href="https://npmjs.org/package/webaudio-tools"><img src="https://img.shields.io/badge/npm-v1.4.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-93-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/webaudio-tools@1.4.0/dist/webaudio-tools.min.js"><img src="https://img.shields.io/badge/brotli-601b-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

useful tools for webaudio

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i webaudio-tools </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add webaudio-tools </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add webaudio-tools</code>
</td></tr></table>
</h4>

## API

<p>  <details id="PeakingDetectorNode$20" title="Class" ><summary><span><a href="#PeakingDetectorNode$20">#</a></span>  <code><strong>PeakingDetectorNode</strong></code>     &ndash; PeakingDetectorNode.</summary>  <a href="src/peaking-detector.ts#L22">src/peaking-detector.ts#L22</a>  <ul>  <p>

Detects if signal is peaking above a threshold and emits `peaking` event.

```ts
const peakingDetectorNode = new PeakingDetectorNode(ctx)
peakingDetectorNode.decibelsThreshold = -1
peakingDetectorNode.onpeaking = () => console.log('peaking')

someAudioNode.connect(peakingDetectorNode)
// ... sometime later peaking is detected and fired once ...
// => console: "peaking"
//
// ... then when issue is resolved by user
// we make it possible to emit "peaking" event again
peakingDetectorNode.reset()
```

</p>
      <p>  <details id="constructor$21" title="Constructor" ><summary><span><a href="#constructor$21">#</a></span>  <code><strong>constructor</strong></code><em>(ctx)</em>    </summary>  <a href="src/peaking-detector.ts#L32">src/peaking-detector.ts#L32</a>  <ul>    <p>  <details id="new PeakingDetectorNode$22" title="ConstructorSignature" ><summary><span><a href="#new PeakingDetectorNode$22">#</a></span>  <code><strong>new PeakingDetectorNode</strong></code><em>()</em>    </summary>    <ul><p><a href="#PeakingDetectorNode$20">PeakingDetectorNode</a></p>      <p>  <details id="ctx$23" title="Parameter" ><summary><span><a href="#ctx$23">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><span>BaseAudioContext</span></p>        </ul></details></p>  </ul></details></p>    </ul></details><details id="decibelsThreshold$25" title="Property" ><summary><span><a href="#decibelsThreshold$25">#</a></span>  <code><strong>decibelsThreshold</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>-1</code></span>   &ndash; Decibels threshold in dBFS to emit peaking when above</summary>  <a href="src/peaking-detector.ts#L26">src/peaking-detector.ts#L26</a>  <ul><p>number</p>        </ul></details><details id="isPeaking$24" title="Property" ><summary><span><a href="#isPeaking$24">#</a></span>  <code><strong>isPeaking</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>   &ndash; Indicator whether node is peaking</summary>  <a href="src/peaking-detector.ts#L24">src/peaking-detector.ts#L24</a>  <ul><p>boolean</p>        </ul></details><details id="onpeaking$26" title="Method" ><summary><span><a href="#onpeaking$26">#</a></span>  <code><strong>onpeaking</strong></code><em>()</em>     &ndash; Event callback that fires when peaking is detected</summary>  <a href="src/peaking-detector.ts#L28">src/peaking-detector.ts#L28</a>  <ul>    <p>      <p><strong>onpeaking</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="reset$29" title="Method" ><summary><span><a href="#reset$29">#</a></span>  <code><strong>reset</strong></code><em>()</em>    </summary>  <a href="src/peaking-detector.ts#L56">src/peaking-detector.ts#L56</a>  <ul>    <p>      <p><strong>reset</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details><details id="SilenceDetectorNode$31" title="Class" ><summary><span><a href="#SilenceDetectorNode$31">#</a></span>  <code><strong>SilenceDetectorNode</strong></code>     &ndash; SilenceDetectorNode.</summary>  <a href="src/silence-detector.ts#L21">src/silence-detector.ts#L21</a>  <ul>  <p>

Emits `silent` when signal is producing silence for a given amount of time
and emits `playing` when it starts playing.

```ts
const silenceDetectorNode = new SilenceDetectorNode(ctx)
silenceDetectorNode.silenceThresholdSeconds = 0.5
silenceDetectorNode.onplaying = () => console.log('playing')
silenceDetectorNode.onsilent = () => console.log('silent')

oscillatorNode.connect(silenceDetectorNode)
oscillatorNode.start() // => console: "playing"
...
oscillatorNode.stop()
// ... after 0.5 seconds ...
// => console: "silent"
```

</p>
      <p>  <details id="constructor$32" title="Constructor" ><summary><span><a href="#constructor$32">#</a></span>  <code><strong>constructor</strong></code><em>(ctx)</em>    </summary>  <a href="src/silence-detector.ts#L34">src/silence-detector.ts#L34</a>  <ul>    <p>  <details id="new SilenceDetectorNode$33" title="ConstructorSignature" ><summary><span><a href="#new SilenceDetectorNode$33">#</a></span>  <code><strong>new SilenceDetectorNode</strong></code><em>()</em>    </summary>    <ul><p><a href="#SilenceDetectorNode$31">SilenceDetectorNode</a></p>      <p>  <details id="ctx$34" title="Parameter" ><summary><span><a href="#ctx$34">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><span>BaseAudioContext</span></p>        </ul></details></p>  </ul></details></p>    </ul></details><details id="isSilent$35" title="Property" ><summary><span><a href="#isSilent$35">#</a></span>  <code><strong>isSilent</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>true</code></span>   &ndash; Indicates whether there is silence or not</summary>  <a href="src/silence-detector.ts#L23">src/silence-detector.ts#L23</a>  <ul><p>boolean</p>        </ul></details><details id="silenceThresholdSeconds$36" title="Property" ><summary><span><a href="#silenceThresholdSeconds$36">#</a></span>  <code><strong>silenceThresholdSeconds</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0.5</code></span>   &ndash; How much silent time in seconds in order to detect silence (default: 0.5)</summary>  <a href="src/silence-detector.ts#L25">src/silence-detector.ts#L25</a>  <ul><p>number</p>        </ul></details><details id="onplaying$39" title="Method" ><summary><span><a href="#onplaying$39">#</a></span>  <code><strong>onplaying</strong></code><em>()</em>     &ndash; Event callback that fires when node receives audio</summary>  <a href="src/silence-detector.ts#L30">src/silence-detector.ts#L30</a>  <ul>    <p>      <p><strong>onplaying</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="onsilent$37" title="Method" ><summary><span><a href="#onsilent$37">#</a></span>  <code><strong>onsilent</strong></code><em>()</em>     &ndash; Event callback that fires when node becomes silent</summary>  <a href="src/silence-detector.ts#L28">src/silence-detector.ts#L28</a>  <ul>    <p>      <p><strong>onsilent</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details><details id="dbToFloat$1" title="Function" ><summary><span><a href="#dbToFloat$1">#</a></span>  <code><strong>dbToFloat</strong></code><em>(db)</em>     &ndash; Convert dBFS value <code>db</code> to float.</summary>  <a href="src/db.ts#L7">src/db.ts#L7</a>  <ul>    <p>    <details id="db$3" title="Parameter" ><summary><span><a href="#db$3">#</a></span>  <code><strong>db</strong></code>     &ndash; Value in dBFS</summary>    <ul><p>number</p>        </ul></details>  <p><strong>dbToFloat</strong><em>(db)</em>  &nbsp;=&gt;  <ul>number</ul></p></p>    </ul></details><details id="fetchAudioBuffer$7" title="Function" ><summary><span><a href="#fetchAudioBuffer$7">#</a></span>  <code><strong>fetchAudioBuffer</strong></code><em>(ctx, url)</em>     &ndash; Fetches and decodes an <code>AudioBuffer</code> from a <code>url</code>.</summary>  <a href="src/fetch-audio-buffer.ts#L8">src/fetch-audio-buffer.ts#L8</a>  <ul>    <p>    <details id="ctx$9" title="Parameter" ><summary><span><a href="#ctx$9">#</a></span>  <code><strong>ctx</strong></code>     &ndash; AudioContext to use.</summary>    <ul><p><span>AudioContext</span></p>        </ul></details><details id="url$10" title="Parameter" ><summary><span><a href="#url$10">#</a></span>  <code><strong>url</strong></code>     &ndash; URL to fetch audio file from.</summary>    <ul><p>string</p>        </ul></details>  <p><strong>fetchAudioBuffer</strong><em>(ctx, url)</em>  &nbsp;=&gt;  <ul><span>Promise</span>&lt;<span>AudioBuffer</span>&gt;</ul></p></p>    </ul></details><details id="fftLogIndexer$11" title="Function" ><summary><span><a href="#fftLogIndexer$11">#</a></span>  <code><strong>fftLogIndexer</strong></code><em>(minFreq, maxFreq, sampleRate, fftSize)</em>     &ndash; Returns a function that converts normalized FFT output for a given range
from linear to logarithmic scale, used for drawing spectrograms.</summary>  <a href="src/fft-log-indexer.ts#L11">src/fft-log-indexer.ts#L11</a>  <ul>    <p>    <details id="minFreq$13" title="Parameter" ><summary><span><a href="#minFreq$13">#</a></span>  <code><strong>minFreq</strong></code>     &ndash; Minimum frequency.</summary>    <ul><p>number</p>        </ul></details><details id="maxFreq$14" title="Parameter" ><summary><span><a href="#maxFreq$14">#</a></span>  <code><strong>maxFreq</strong></code>     &ndash; Maximum frequency.</summary>    <ul><p>number</p>        </ul></details><details id="sampleRate$15" title="Parameter" ><summary><span><a href="#sampleRate$15">#</a></span>  <code><strong>sampleRate</strong></code>     &ndash; Sample rate.</summary>    <ul><p>number</p>        </ul></details><details id="fftSize$16" title="Parameter" ><summary><span><a href="#fftSize$16">#</a></span>  <code><strong>fftSize</strong></code>    </summary>    <ul><p>number</p>        </ul></details>  <p><strong>fftLogIndexer</strong><em>(minFreq, maxFreq, sampleRate, fftSize)</em>  &nbsp;=&gt;  <ul><details id="__type$17" title="Function" ><summary><span><a href="#__type$17">#</a></span>  <em>(normal)</em>    </summary>    <ul>    <p>    <details id="normal$19" title="Parameter" ><summary><span><a href="#normal$19">#</a></span>  <code><strong>normal</strong></code>    </summary>    <ul><p>number</p>        </ul></details>  <p><strong></strong><em>(normal)</em>  &nbsp;=&gt;  <ul>number</ul></p></p>    </ul></details></ul></p></p>    </ul></details><details id="floatToDb$4" title="Function" ><summary><span><a href="#floatToDb$4">#</a></span>  <code><strong>floatToDb</strong></code><em>(float)</em>     &ndash; Convert float value <code>float</code> to dBFS.</summary>  <a href="src/db.ts#L15">src/db.ts#L15</a>  <ul>    <p>    <details id="float$6" title="Parameter" ><summary><span><a href="#float$6">#</a></span>  <code><strong>float</strong></code>     &ndash; Value in float</summary>    <ul><p>number</p>        </ul></details>  <p><strong>floatToDb</strong><em>(float)</em>  &nbsp;=&gt;  <ul>number</ul></p></p>    </ul></details></p>

## Contributing

[Fork](https://github.com/stagas/webaudio-tools/fork) or [edit](https://github.dev/stagas/webaudio-tools) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
