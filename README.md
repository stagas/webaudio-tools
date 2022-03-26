<h1 align="center">webaudio-tools</h1>

<p align="center">
useful tools for webaudio
</p>

<p align="center">
   <a href="#install">        🔧 <strong>Install</strong></a>
 · <a href="#example">        🧩 <strong>Example</strong></a>
 · <a href="#api">            📜 <strong>API docs</strong></a>
 · <a href="https://github.com/stagas/webaudio-tools/releases"> 🔥 <strong>Releases</strong></a>
 · <a href="#contribute">     💪🏼 <strong>Contribute</strong></a>
 · <a href="https://github.com/stagas/webaudio-tools/issues">   🖐️ <strong>Help</strong></a>
</p>

---

## Install

```sh
$ npm i webaudio-tools
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [dbToFloat](#dbtofloat)
  - [Parameters](#parameters)
- [floatToDb](#floattodb)
  - [Parameters](#parameters-1)
- [PeakingDetectorNode](#peakingdetectornode)
  - [Parameters](#parameters-2)
  - [isPeaking](#ispeaking)
  - [decibelsThreshold](#decibelsthreshold)
  - [onpeaking](#onpeaking)
- [SilenceDetectorNode](#silencedetectornode)
  - [Parameters](#parameters-3)
  - [isSilent](#issilent)
  - [silenceThresholdSeconds](#silencethresholdseconds)
  - [onsilent](#onsilent)
  - [onplaying](#onplaying)

### dbToFloat

[src/db.ts:7-7](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/db.ts#L7-L7 "Source code on GitHub")

Convert dBFS value `db` to float.

#### Parameters

- `db` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Value in dBFS

Returns **any** the value in float

### floatToDb

[src/db.ts:15-15](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/db.ts#L15-L15 "Source code on GitHub")

Convert float value `float` to dBFS.

#### Parameters

- `float` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Value in float

Returns **any** the value in dBFS

### PeakingDetectorNode

[src/peaking-detector.ts:20-57](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/peaking-detector.ts#L20-L57 "Source code on GitHub")

**Extends GainNode**

PeakingDetectorNode.

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

#### Parameters

- `ctx` **BaseAudioContext**&#x20;

#### isPeaking

[src/peaking-detector.ts:22-22](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/peaking-detector.ts#L22-L22 "Source code on GitHub")

Indicator whether node is peaking

#### decibelsThreshold

[src/peaking-detector.ts:24-24](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/peaking-detector.ts#L24-L24 "Source code on GitHub")

Decibels threshold in dBFS to emit peaking when above

#### onpeaking

[src/peaking-detector.ts:26-26](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/peaking-detector.ts#L26-L26 "Source code on GitHub")

Event callback that fires when peaking is detected

Returns **void**&#x20;

### SilenceDetectorNode

[src/silence-detector.ts:18-67](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/silence-detector.ts#L18-L67 "Source code on GitHub")

**Extends GainNode**

SilenceDetectorNode.

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

#### Parameters

- `ctx` **BaseAudioContext**&#x20;

#### isSilent

[src/silence-detector.ts:20-20](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/silence-detector.ts#L20-L20 "Source code on GitHub")

Indicates whether there is silence or not

#### silenceThresholdSeconds

[src/silence-detector.ts:22-22](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/silence-detector.ts#L22-L22 "Source code on GitHub")

How much silent time in seconds in order to detect silence (default: 0.5)

#### onsilent

[src/silence-detector.ts:25-25](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/silence-detector.ts#L25-L25 "Source code on GitHub")

Event callback that fires when node becomes silent

Returns **void**&#x20;

#### onplaying

[src/silence-detector.ts:27-27](https://github.com/stagas/webaudio-tools/blob/55c0a60b830dcf1538b3e8616813abee24b8e30b/src/silence-detector.ts#L27-L27 "Source code on GitHub")

Event callback that fires when node receives audio

Returns **void**&#x20;

## Contribute

[Fork](https://github.com/stagas/webaudio-tools/fork) or
[edit](https://github.dev/stagas/webaudio-tools) and submit a PR.

All contributions are welcome!

## License

MIT © 2022
[stagas](https://github.com/stagas)
