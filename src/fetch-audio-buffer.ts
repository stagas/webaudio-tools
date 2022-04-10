/**
 * Fetches and decodes an `AudioBuffer` from a `url`.
 *
 * @param ctx AudioContext to use.
 * @param url URL to fetch audio file from.
 * @returns An AudioBuffer.
 */
export const fetchAudioBuffer = async (ctx: AudioContext, url: string) => {
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  return await ctx.decodeAudioData(arrayBuffer)
}
