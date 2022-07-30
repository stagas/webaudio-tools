export const MidiOp = {
  NoteOff: 0x80,
  NoteOn: 0x90,
}

// TODO: this is also in globals.d.ts, no idea why sometimes TS doesn't pick it up
// NOTE: it doesn't compile without it
declare class MIDIMessageEvent extends Event implements WebMidi.MIDIMessageEvent {
  data: Uint8Array
  receivedTime: number
  constructor(kind: string, payload?: { data: Uint8Array })
}

export const createMidiEvent = (time: number, data: number[]) => {
  const event = new MIDIMessageEvent('midimessage', { data: new Uint8Array(data) }) as WebMidi.MIDIMessageEvent
  event.receivedTime = time * 1000
  return event
}

export const createMidiNoteEvents = (time: number, note: number, velocity: number, length: number) => {
  const midiEvents = []

  {
    const midiEvent = createMidiEvent(time, [
      MidiOp.NoteOn,
      note,
      velocity,
    ])
    midiEvents.push(midiEvent)
  }

  {
    const midiEvent = createMidiEvent(time + length, [
      MidiOp.NoteOff,
      note,
      0,
    ])
    midiEvents.push(midiEvent)
  }

  return midiEvents
}
