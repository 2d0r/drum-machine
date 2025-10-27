import { DEFAULT_PATTERN, DRUM_SAMPLES } from './constants';
import type { DrumName, Pattern } from '@shared/types';
import * as Tone from 'tone';

export const getTonejsDrumSampleUrl = (kit: string, drum: DrumName) => {
    return `https://tonejs.github.io/audio/drum-samples/${kit}/${drum}.mp3`;
}

export const generateEmptyPattern = (length: number) => {
    const pattern = {
        name: 'New pattern',
        steps: {},
        length,
        createdAt: new Date(),
    } as any;
    Object.keys(DRUM_SAMPLES).forEach(drum => {
        pattern.steps[drum] = Array(length).fill({ active: false });
    });

    return pattern as Pattern;
}

export const generateNewSequence = ({ pattern = DEFAULT_PATTERN, setCurrentStep }: {
    pattern?: Pattern,
    setCurrentStep: (_: number) => void,
}) => {
    const { length } = pattern;
    const drums: DrumName[] = Object.keys(DRUM_SAMPLES) as DrumName[];
    // const transportSeconds = Tone.getTransport().seconds;
    // const stepDuration = Tone.Time('16n').toSeconds(); // duration of one step
    // const nextStep = Math.floor(transportSeconds / stepDuration);

    return new Tone.Sequence(
        (time, step) => {
            setCurrentStep(step);
            drums.forEach(drum => {
                if (pattern?.steps[drum][step]?.active) {
                    DRUM_SAMPLES[drum].start(time);
                }
            });
        },
        Array.from({length}, (_, i) => i), // 16 steps
        '16n'
    );
}

export const getCumulativeStep = (currentStep: number) => {
    const transportSeconds = Tone.getTransport().seconds;
    const nextStep = Math.floor(transportSeconds / (60 / Tone.getTransport().bpm.value / 4)); 
    // // 4 = assuming 16th notes, adjust to your resolution
    const startStep = Math.max(nextStep, currentStep);

    // const stepDuration = Tone.Time('16n').toSeconds(); // duration of one step
    // const startStep = Math.floor(transportSeconds / stepDuration);

    return startStep;
}

export const checkStartTimeIsGreaterThanPrevStartTime = (getCumulativeStep: number) => {
    const prevStartTime = Tone.getTransport().seconds;

    const stepDuration = Tone.Time('16n').toSeconds();
    const startTime = getCumulativeStep * stepDuration;

    if (startTime > prevStartTime) return true;
    return false;
}