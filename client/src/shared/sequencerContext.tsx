import * as Tone from 'tone';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { DrumName, Pattern } from './types';
import { DEFAULT_PATTERN, DRUM_SAMPLES } from './constants';

type SessionContextType = {
    sequence: Tone.Sequence | undefined;
    setSequence: (sq: Tone.Sequence) => void;
    isPlaying: boolean; setIsPlaying: (b: boolean) => void;
    pattern: Pattern; setPattern: (p: Pattern) => void;
    patternRef: React.RefObject<Pattern>;
    currentStep: number; setCurrentStep: (n: number) => void;
    tempo: number; setTempo: (n: number) => void;
}

const SequencerContext = createContext<SessionContextType | undefined>(undefined);

export function SequencerContextProvider({children}: {children: ReactNode}) {
    const [sequence, setSequence] = useState<Tone.Sequence | undefined>(undefined);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [tempo, setTempo] = useState<number>(120);

    const [pattern, setPattern] = useState<Pattern>(DEFAULT_PATTERN);
    const patternRef = useRef<Pattern>(DEFAULT_PATTERN);

    const drums: DrumName[] = Object.keys(DRUM_SAMPLES) as DrumName[];

    useEffect(() => {
        const startTone = async () => await Tone.start();
        startTone();

        const newSequence = new Tone.Sequence(
            (time, step) => {
                setCurrentStep(step);
                drums.forEach(drum => {
                    if (patternRef.current[drum][step].active) {
                        DRUM_SAMPLES[drum].start(time);
                    }
                });
            },
            Array.from({length: 16}, (_, i) => i), // 16 steps
            "16n"
        );
        setSequence(newSequence);
    }, []);

    return (<SequencerContext.Provider value={{
        sequence, setSequence, 
        isPlaying, setIsPlaying, 
        pattern, setPattern, patternRef,
        currentStep, setCurrentStep,
        tempo, setTempo,
    }}>
        {children}
    </SequencerContext.Provider>)
}

export function useSequencerContext() {
    const context = useContext(SequencerContext);
    if (!context) throw new Error("useSequencerContext must be used within a SessionProvider");
    return context;
}