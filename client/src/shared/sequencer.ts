import * as Tone from 'tone';
import type { DrumName, Pattern } from './types';
import { DRUM_SAMPLES } from './constants';

export const startSequencer = (pattern: Pattern, bpm = 120) => {
  Tone.getTransport().cancel(); // clear old events
  Tone.getTransport().bpm.value = bpm;

  const steps = pattern.kick.length; // assume all have same length
  for (let i = 0; i < steps; i++) {
    const time = `0:${Math.floor(i / 4)}:${i % 4}`; // 16 steps = 4 beats
    Object.entries(pattern).forEach(([drum, steps]) => {
      if (steps[i].active) {
        Tone.getTransport().schedule(time => {
          DRUM_SAMPLES[drum as DrumName].start(time);
        }, time);
      }
    });
  }

  Tone.getTransport().start();
};