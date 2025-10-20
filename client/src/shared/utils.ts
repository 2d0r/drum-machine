import type { DrumName } from './types'

export const getTonejsDrumSampleUrl = (kit: string, drum: DrumName) => {
    return `https://tonejs.github.io/audio/drum-samples/${kit}/${drum}.mp3`;
}