import * as Tone from 'tone';
import { createContext, useContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { type TimeSig, type Pattern, type ModalName, type GenrePattern } from '@shared/types';
import { DEFAULT_PATTERN } from './constants';

type SessionContextType = {
    currentStep: number; setCurrentStep: Dispatch<SetStateAction<number>>;
    genrePatterns: GenrePattern[]; setGenrePatterns: Dispatch<SetStateAction<GenrePattern[]>>;
    isPlaying: boolean; setIsPlaying: (_: boolean) => void;
    lastStartRef:  React.RefObject<number>;
    modal: ModalName; setModal: (_: ModalName) => void;
    pattern: Pattern; setPattern: Dispatch<SetStateAction<Pattern>>;
    sequenceRef: React.RefObject<Tone.Sequence | null>;
    stopSequence: () => void;
    tempo: number; setTempo: (_: number) => void;
    timeSig: TimeSig; setTimeSig: (t: TimeSig) => void;
    toast: string; setToast: (_: string) => void;
}

const SequencerContext = createContext<SessionContextType | undefined>(undefined);

export function SequencerContextProvider({children}: {children: ReactNode}) {
    const [pattern, setPattern] = useState<Pattern>(DEFAULT_PATTERN);
    const [genrePatterns, setGenrePatterns] = useState<GenrePattern[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [tempo, setTempo] = useState<number>(120);
    const [timeSig, setTimeSig] = useState<TimeSig>('4/4');
    const [toast, setToast] = useState<string>('');
    const [modal, setModal] = useState<ModalName>(null);

    const sequenceRef = useRef<Tone.Sequence>(null);
    const lastStartRef = useRef<number>(0);

    useEffect(() => {

    });

    const stopSequence = async () => {
        const sequence = sequenceRef.current;
        if (sequence) {
            sequence.stop(Tone.now());
            sequence.dispose();
        }
        Tone.getTransport().stop();
        Tone.getTransport().position = 0;
        lastStartRef.current = 0;
        setCurrentStep(0);
        setIsPlaying(false);
    };

    return (<SequencerContext.Provider value={{
        currentStep, setCurrentStep,
        genrePatterns, setGenrePatterns,
        isPlaying, setIsPlaying, 
        lastStartRef,
        modal, setModal,
        pattern, setPattern,
        sequenceRef,
        stopSequence,
        tempo, setTempo,
        timeSig, setTimeSig,
        toast, setToast,
    }}>
        {children}
    </SequencerContext.Provider>)
}

export function useSequencerContext() {
    const context = useContext(SequencerContext);
    if (!context) throw new Error("useSequencerContext must be used within a SessionProvider");
    return context;
}