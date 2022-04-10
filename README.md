<h1>
webaudio-tools <a href="https://npmjs.org/package/webaudio-tools"><img src="https://img.shields.io/badge/npm-v1.3.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-87-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/webaudio-tools@1.3.0/dist/webaudio-tools.min.js"><img src="https://img.shields.io/badge/brotli-557b-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
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

<p>  <details id="PeakingDetectorNode$16" title="Class" ><summary><span><a href="#PeakingDetectorNode$16">#</a></span>  <code><strong>PeakingDetectorNode</strong></code>     &ndash; PeakingDetectorNode.</summary>  <a href="src/peaking-detector.ts#L22">src/peaking-detector.ts#L22</a>  <ul>  <p>

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
      <p>  <details id="constructor$17" title="Constructor" ><summary><span><a href="#constructor$17">#</a></span>  <code><strong>constructor</strong></code><em>(ctx)</em>    </summary>  <a href="src/peaking-detector.ts#L32">src/peaking-detector.ts#L32</a>  <ul>    <p>  <details id="new PeakingDetectorNode$18" title="ConstructorSignature" ><summary><span><a href="#new PeakingDetectorNode$18">#</a></span>  <code><strong>new PeakingDetectorNode</strong></code><em>()</em>    </summary>    <ul><p><a href="#PeakingDetectorNode$16">PeakingDetectorNode</a></p>      <p>  <details id="ctx$19" title="Parameter" ><summary><span><a href="#ctx$19">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><span>BaseAudioContext</span></p>        </ul></details></p>  </ul></details></p>    </ul></details><details id="decibelsThreshold$21" title="Property" ><summary><span><a href="#decibelsThreshold$21">#</a></span>  <code><strong>decibelsThreshold</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>-1</code></span>   &ndash; Decibels threshold in dBFS to emit peaking when above</summary>  <a href="src/peaking-detector.ts#L26">src/peaking-detector.ts#L26</a>  <ul><p>number</p>        </ul></details><details id="isPeaking$20" title="Property" ><summary><span><a href="#isPeaking$20">#</a></span>  <code><strong>isPeaking</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>   &ndash; Indicator whether node is peaking</summary>  <a href="src/peaking-detector.ts#L24">src/peaking-detector.ts#L24</a>  <ul><p>boolean</p>        </ul></details><details id="onpeaking$22" title="Method" ><summary><span><a href="#onpeaking$22">#</a></span>  <code><strong>onpeaking</strong></code><em>()</em>     &ndash; Event callback that fires when peaking is detected</summary>  <a href="src/peaking-detector.ts#L28">src/peaking-detector.ts#L28</a>  <ul>    <p>      <p><strong>onpeaking</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="reset$25" title="Method" ><summary><span><a href="#reset$25">#</a></span>  <code><strong>reset</strong></code><em>()</em>    </summary>  <a href="src/peaking-detector.ts#L56">src/peaking-detector.ts#L56</a>  <ul>    <p>      <p><strong>reset</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details><details id="SilenceDetectorNode$27" title="Class" ><summary><span><a href="#SilenceDetectorNode$27">#</a></span>  <code><strong>SilenceDetectorNode</strong></code>     &ndash; SilenceDetectorNode.</summary>  <a href="src/silence-detector.ts#L21">src/silence-detector.ts#L21</a>  <ul>  <p>

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
      <p>  <details id="constructor$28" title="Constructor" ><summary><span><a href="#constructor$28">#</a></span>  <code><strong>constructor</strong></code><em>(ctx)</em>    </summary>  <a href="src/silence-detector.ts#L34">src/silence-detector.ts#L34</a>  <ul>    <p>  <details id="new SilenceDetectorNode$29" title="ConstructorSignature" ><summary><span><a href="#new SilenceDetectorNode$29">#</a></span>  <code><strong>new SilenceDetectorNode</strong></code><em>()</em>    </summary>    <ul><p><a href="#SilenceDetectorNode$27">SilenceDetectorNode</a></p>      <p>  <details id="ctx$30" title="Parameter" ><summary><span><a href="#ctx$30">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><span>BaseAudioContext</span></p>        </ul></details></p>  </ul></details></p>    </ul></details><details id="isSilent$31" title="Property" ><summary><span><a href="#isSilent$31">#</a></span>  <code><strong>isSilent</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>true</code></span>   &ndash; Indicates whether there is silence or not</summary>  <a href="src/silence-detector.ts#L23">src/silence-detector.ts#L23</a>  <ul><p>boolean</p>        </ul></details><details id="silenceThresholdSeconds$32" title="Property" ><summary><span><a href="#silenceThresholdSeconds$32">#</a></span>  <code><strong>silenceThresholdSeconds</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0.5</code></span>   &ndash; How much silent time in seconds in order to detect silence (default: 0.5)</summary>  <a href="src/silence-detector.ts#L25">src/silence-detector.ts#L25</a>  <ul><p>number</p>        </ul></details><details id="onplaying$35" title="Method" ><summary><span><a href="#onplaying$35">#</a></span>  <code><strong>onplaying</strong></code><em>()</em>     &ndash; Event callback that fires when node receives audio</summary>  <a href="src/silence-detector.ts#L30">src/silence-detector.ts#L30</a>  <ul>    <p>      <p><strong>onplaying</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="onsilent$33" title="Method" ><summary><span><a href="#onsilent$33">#</a></span>  <code><strong>onsilent</strong></code><em>()</em>     &ndash; Event callback that fires when node becomes silent</summary>  <a href="src/silence-detector.ts#L28">src/silence-detector.ts#L28</a>  <ul>    <p>      <p><strong>onsilent</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details><details id="dbToFloat$1" title="Function" ><summary><span><a href="#dbToFloat$1">#</a></span>  <code><strong>dbToFloat</strong></code><em>(db)</em>     &ndash; Convert dBFS value <code>db</code> to float.</summary>  <a href="src/db.ts#L7">src/db.ts#L7</a>  <ul>    <p>    <details id="db$3" title="Parameter" ><summary><span><a href="#db$3">#</a></span>  <code><strong>db</strong></code>     &ndash; Value in dBFS</summary>    <ul><p>number</p>        </ul></details>  <p><strong>dbToFloat</strong><em>(db)</em>  &nbsp;=&gt;  <ul>number</ul></p></p>    </ul></details><details id="fftLogIndexer$7" title="Function" ><summary><span><a href="#fftLogIndexer$7">#</a></span>  <code><strong>fftLogIndexer</strong></code><em>(minFreq, maxFreq, sampleRate, fftSize)</em>     &ndash; Returns a function that converts normalized FFT output for a given range
from linear to logarithmic scale, used for drawing spectrograms.</summary>  <a href="src/fft-log-indexer.ts#L11">src/fft-log-indexer.ts#L11</a>  <ul>    <p>    <details id="minFreq$9" title="Parameter" ><summary><span><a href="#minFreq$9">#</a></span>  <code><strong>minFreq</strong></code>     &ndash; Minimum frequency.</summary>    <ul><p>number</p>        </ul></details><details id="maxFreq$10" title="Parameter" ><summary><span><a href="#maxFreq$10">#</a></span>  <code><strong>maxFreq</strong></code>     &ndash; Maximum frequency.</summary>    <ul><p>number</p>        </ul></details><details id="sampleRate$11" title="Parameter" ><summary><span><a href="#sampleRate$11">#</a></span>  <code><strong>sampleRate</strong></code>     &ndash; Sample rate.</summary>    <ul><p>number</p>        </ul></details><details id="fftSize$12" title="Parameter" ><summary><span><a href="#fftSize$12">#</a></span>  <code><strong>fftSize</strong></code>    </summary>    <ul><p>number</p>        </ul></details>  <p><strong>fftLogIndexer</strong><em>(minFreq, maxFreq, sampleRate, fftSize)</em>  &nbsp;=&gt;  <ul><details id="__type$13" title="Function" ><summary><span><a href="#__type$13">#</a></span>  <em>(normal)</em>    </summary>    <ul>    <p>    <details id="normal$15" title="Parameter" ><summary><span><a href="#normal$15">#</a></span>  <code><strong>normal</strong></code>    </summary>    <ul><p>number</p>        </ul></details>  <p><strong></strong><em>(normal)</em>  &nbsp;=&gt;  <ul>number</ul></p></p>    </ul></details></ul></p></p>    </ul></details><details id="floatToDb$4" title="Function" ><summary><span><a href="#floatToDb$4">#</a></span>  <code><strong>floatToDb</strong></code><em>(float)</em>     &ndash; Convert float value <code>float</code> to dBFS.</summary>  <a href="src/db.ts#L15">src/db.ts#L15</a>  <ul>    <p>    <details id="float$6" title="Parameter" ><summary><span><a href="#float$6">#</a></span>  <code><strong>float</strong></code>     &ndash; Value in float</summary>    <ul><p>number</p>        </ul></details>  <p><strong>floatToDb</strong><em>(float)</em>  &nbsp;=&gt;  <ul>number</ul></p></p>    </ul></details></p>

## Contributing

[Fork](https://github.com/stagas/webaudio-tools/fork) or [edit](https://github.dev/stagas/webaudio-tools) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
