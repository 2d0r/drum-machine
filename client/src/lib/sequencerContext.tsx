import * as Tone from 'tone';
import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { type TimeSig, type Pattern, type ModalName, type GenreTagStatus } from '@shared/types';
import { DEFAULT_PATTERN } from './constants';

type SessionContextType = {
    sequenceRef: React.RefObject<Tone.Sequence | null>;
    isPlaying: boolean; setIsPlaying: (_: boolean) => void;
    patternRef: React.RefObject<Pattern>;
    currentStep: number; setCurrentStep: (_: number) => void;
    tempo: number; setTempo: (_: number) => void;
    timeSig: TimeSig; setTimeSig: (t: TimeSig) => void;
    toast: string; setToast: (_: string) => void;
    stopSequence: () => void;
    lastStartRef:  React.RefObject<number>;
    modal: ModalName; setModal: (_: ModalName) => void;
    genreTagsStatus: GenreTagStatus;  setGenreTagsStatus: (_: GenreTagStatus) => void; 
}

const SequencerContext = createContext<SessionContextType | undefined>(undefined);

export function SequencerContextProvider({children}: {children: ReactNode}) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [tempo, setTempo] = useState<number>(120);
    const [timeSig, setTimeSig] = useState<TimeSig>('4/4');
    const [toast, setToast] = useState<string>('');
    const [modal, setModal] = useState<ModalName>(null);
    const [genreTagsStatus, setGenreTagsStatus] = useState<GenreTagStatus>('ready');

    const patternRef = useRef<Pattern>(DEFAULT_PATTERN);
    const sequenceRef = useRef<Tone.Sequence>(null);
    const lastStartRef = useRef<number>(0);

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
        sequenceRef,
        isPlaying, setIsPlaying, 
        patternRef, lastStartRef,
        currentStep, setCurrentStep,
        tempo, setTempo,
        timeSig, setTimeSig,
        toast, setToast,
        modal, setModal,
        stopSequence,
        genreTagsStatus, setGenreTagsStatus,
    }}>
        {children}
    </SequencerContext.Provider>)
}

export function useSequencerContext() {
    const context = useContext(SequencerContext);
    if (!context) throw new Error("useSequencerContext must be used within a SessionProvider");
    return context;
}