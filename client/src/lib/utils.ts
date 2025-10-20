import { DRUM_SAMPLES } from './constants';
import type { DrumName, Pattern } from '@shared/types'

export const getTonejsDrumSampleUrl = (kit: string, drum: DrumName) => {
    return `https://tonejs.github.io/audio/drum-samples/${kit}/${drum}.mp3`;
}

export const generateEmptyPattern = (length: number) => {
    const pattern = {
        name: 'Empty pattern',
        steps: {},
        createdAt: new Date(),
    } as any;
    Object.keys(DRUM_SAMPLES).forEach(drum => {
        pattern.steps[drum] = Array(length).fill({ active: false });
    });

    return pattern as Pattern;
}