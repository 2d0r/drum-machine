import * as Tone from 'tone';
import type { DrumName, Pattern } from './types';

export const DRUM_SAMPLES_TONEJS = {
    kick: 'https://tonejs.github.io/audio/drum-samples/Kit8/kick.mp3',
    snare: 'https://tonejs.github.io/audio/drum-samples/Kit8/snare.mp3',
    hihat: 'https://tonejs.github.io/audio/drum-samples/Kit8/hihat.mp3',
    tom1: 'https://tonejs.github.io/audio/drum-samples/Kit8/tom1.mp3',
    tom2: 'https://tonejs.github.io/audio/drum-samples/Kit8/tom2.mp3',
    tom3: 'https://tonejs.github.io/audio/drum-samples/Kit8/tom3.mp3',
};

export const DRUM_SAMPLES: Record<DrumName, Tone.Player> = {
  kick: new Tone.Player('/samples/kick.wav').toDestination(),
  snare: new Tone.Player('/samples/snare.wav').toDestination(),
  hihat: new Tone.Player('/samples/hihat.wav').toDestination(),
  openhh: new Tone.Player('/samples/openhh.wav').toDestination(),
//   ride: new Tone.Player('/samples/ride.wav').toDestination(),
//   crash: new Tone.Player('/samples/crash.wav').toDestination(),
  tom1: new Tone.Player('/samples/tom1.wav').toDestination(),
  tom2: new Tone.Player('/samples/tom2.wav').toDestination(),
//   tom3: new Tone.Player('/samples/tom3.wav').toDestination(),
};

export const DEFAULT_PATTERN: Pattern = {
    kick: Array(16).fill({ active: false }),
    snare: Array(16).fill({ active: false }),
    hihat: Array(16).fill({ active: false }),
    openhh: Array(16).fill({ active: false }),
    tom1: Array(16).fill({ active: false }),
    tom2: Array(16).fill({ active: false }),
};