import * as Tone from 'tone';
import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { type TimeSig, type Pattern } from '@shared/types';
import { DEFAULT_PATTERN } from './constants';

type SessionContextType = {
    sequenceRef: React.RefObject<Tone.Sequence | null>;
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
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [tempo, setTempo] = useState<number>(120);
    const [timeSig, setTimeSig] = useState<TimeSig>('4/4');
    const [toast, setToast] = useState<string>('');
    const [fileLoadModal, setFileLoadModal] = useState<boolean>(false);

    const patternRef = useRef<Pattern>(DEFAULT_PATTERN);
    const sequenceRef = useRef<Tone.Sequence>(null);

    return (<SequencerContext.Provider value={{
        sequenceRef,
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