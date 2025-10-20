import * as Tone from 'tone';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { type TimeSig, type DrumName, type Pattern } from '@shared/types';
import { DEFAULT_PATTERN, DRUM_SAMPLES } from './constants';
import { generateEmptyPattern } from './utils';

type SessionContextType = {
    sequence: Tone.Sequence | undefined;
    setSequence: (sq: Tone.Sequence) => void;
    isPlaying: boolean; setIsPlaying: (_: boolean) => void;
    patternRef: React.RefObject<Pattern>;
    currentStep: number; setCurrentStep: (_: number) => void;
    tempo: number; setTempo: (_: number) => void;
    timeSig: TimeSig; setTimeSig: (t: TimeSig) => void;
    toast: string; setToast: (_: string) => void;
    fileLoadModal: boolean; setFileLoadModal: (_: boolean) => void;
}

const SequencerContext = createContext<SessionContextType | undefined>(undefined);

export function SequencerContextProvider({children}: {children: ReactNode}) {
    const [sequence, setSequence] = useState<Tone.Sequence | undefined>(undefined);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [tempo, setTempo] = useState<number>(120);
    const [timeSig, setTimeSig] = useState<TimeSig>('4/4');
    const [toast, setToast] = useState<string>('');
    const [fileLoadModal, setFileLoadModal] = useState<boolean>(false);

    const patternRef = useRef<Pattern>(DEFAULT_PATTERN);

    const drums: DrumName[] = Object.keys(DRUM_SAMPLES) as DrumName[];

    useEffect(() => {
        const startTone = async () => await Tone.start();
        startTone();

        const newSequence = generateNewSequence();
        setSequence(newSequence);
    }, []);

    useEffect(() => {
        const seqLength = timeSig === '4/4' ? 16 : 12;

        if (sequence) {
            sequence.stop();
            sequence.dispose();
        }
        
        const newPattern = generateEmptyPattern(seqLength);
        patternRef.current = newPattern;
        
        setSequence(generateNewSequence(seqLength, newPattern));
    }, [timeSig]);

    useEffect(() => {
        if (patternRef.current.steps)
            setSequence(generateNewSequence(16, patternRef.current));
    }, [patternRef.current]);

    const generateNewSequence = (length: number = 16, pattern: Pattern = DEFAULT_PATTERN) => {
        return new Tone.Sequence(
            (time, step) => {
                setCurrentStep(step);
                drums.forEach(drum => {
                    if (pattern.steps[drum][step].active) {
                        DRUM_SAMPLES[drum].start(time);
                    }
                });
            },
            Array.from({length}, (_, i) => i), // 16 steps
            '16n'
        );
    }

    return (<SequencerContext.Provider value={{
        sequence, setSequence, 
        isPlaying, setIsPlaying, 
        patternRef,
        currentStep, setCurrentStep,
        tempo, setTempo,
        timeSig, setTimeSig,
        toast, setToast,
        fileLoadModal, setFileLoadModal,
    }}>
        {children}
    </SequencerContext.Provider>)
}

export function useSequencerContext() {
    const context = useContext(SequencerContext);
    if (!context) throw new Error("useSequencerContext must be used within a SessionProvider");
    return context;
}