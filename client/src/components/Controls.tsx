import { Columns2, Folder, Pause, Play, RotateCcw, Save, Shuffle, Square, Timer } from 'lucide-react';
import * as Tone from 'tone';
import { useSequencerContext } from '../lib/sequencerContext';
import type { TimeSig } from '@shared/types';
import { useRef } from 'react';
import { generateEmptyPattern, generateNewSequence } from '../lib/utils';

export default function Controls() {
    const {
        pattern, setPattern,
        sequenceRef,
        isPlaying, setIsPlaying,
        currentStep, setCurrentStep,
        lastStartRef,
        setModal,
        stopSequence
    } = useSequencerContext();
    const tempoDebounceRef = useRef<number | null>(null);
    const toneStartedRef = useRef<boolean>(false);

    const handlePlay = async () => {
        if (!toneStartedRef.current) {
            await Tone.start();
            toneStartedRef.current = true;
        }

        let sequence = sequenceRef.current;

        // If transport is paused, just resume
        if (Tone.getTransport().state === 'paused' && sequence) {
            Tone.getTransport().start();
            setIsPlaying(true);
            return;
        }

        // If sequence exists but transport was stopped, dispose old one
        if (sequence) {
            sequence.stop(Tone.now());
            sequence.dispose();
            sequenceRef.current = null;
        }

        // Create a new sequence
        sequence = generateNewSequence({ setCurrentStep, pattern });
        sequenceRef.current = sequence;

        
        // Start the sequence slightly in the future to avoid race conditions
        const offsetStep = currentStep ?? 0;
        sequence.start("+0.01", offsetStep);

        lastStartRef.current = Tone.now();
        Tone.getTransport().start();
        setIsPlaying(true);
    };

    const handlePause = async () => {
        Tone.getTransport().pause();
        setIsPlaying(false);
    };

    const handleStop = () => stopSequence();

    const handleChangeTempo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTempo = Number(event.target.value);
        setPattern(prev => ({ ...prev, tempo: newTempo }));

        if (tempoDebounceRef.current) clearTimeout(tempoDebounceRef.current);

        tempoDebounceRef.current = setTimeout(() => {
            let clamped = newTempo;
            if (newTempo < 20) clamped = 20;
            if (newTempo > 300) clamped = 300;

            setPattern(prev => ({ ...prev, tempo: clamped }));
            Tone.getTransport().bpm.value = clamped;
        }, 1000);
    };

    const handleSelectTimeSignature = async (newTimeSig: TimeSig) => {
        stopSequence();

        const newPattern = generateEmptyPattern(newTimeSig);
        setPattern(newPattern);
        
        sequenceRef.current = generateNewSequence({ setCurrentStep, pattern: newPattern });
    };

    const handleSave = async () => {
        setModal('save');
    };

    const handleLoad = async () => {
        setModal('load');
    }

    const handleReset = async () => {
        setPattern(generateEmptyPattern(pattern.timeSig));
    }

    return (
        <div id='controls' className='w-full h-10 flex items-center'>
            <div id='controls-left' className='flex gap-2 flex-1'>
                <div id='tempo' className='h-10 border-1 border-gray-700 px-2 rounded-xl flex gap-1 items-center justify-between cursor-pointer'>
                    <Timer className='text-gray-700 h-5' />
                    <input
                        value={pattern.tempo}
                        onChange={(e) => handleChangeTempo(e)}
                        type='number'
                        className='focus:outline-0 text-center'
                        min='20'
                        max='200'
                    />
                </div>
                <div id='time-signature' className='w-24 h-10 border-1 border-gray-700 rounded-xl px-2 flex gap-2 items-center justify-center cursor-pointer'>
                    <Columns2 className='h-5 text-gray-700' />
                    <select
                        onChange={(e) => handleSelectTimeSignature(e.target.value as TimeSig)}
                        className='text-center cursor-pointer'
                        value={pattern.timeSig}
                    >
                        <option value='4/4'>4/4</option>
                        <option value='3/4'>3/4</option>
                    </select>
                </div>
            </div>

            <div id='controls-center' className='flex gap-8 flex-1 justify-center'>
                <Square
                    className='text-white fill-white cursor-pointer'
                    onClick={handleStop}
                />
                {isPlaying ? (
                    <Pause
                        className='text-white fill-white cursor-pointer'
                        onClick={handlePause}
                    />
                    ) : (
                    <Play
                        className='text-white fill-white cursor-pointer'
                        onClick={handlePlay}
                    />
                )}
                <Shuffle className='text-white cursor-pointer' />
            </div>
            <div id='controls-right' className='flex flex-1 gap-2 justify-end'>
                <button 
                    type='button'
                    onClick={handleReset}
                    className='w-24 h-10 button-primary text-center cursor-pointer flex gap-2 items-center'
                >
                    <RotateCcw className='h-5 text-gray-700' />
                    Reset
                </button>
                <button 
                    type='button'
                    onClick={handleLoad}
                    className='w-24 h-10 border-1 border-gray-700 rounded-xl px-2 text-center cursor-pointer flex gap-2 items-center'
                >
                    <Folder className='h-5 text-gray-700' />
                    Load
                </button>
                <button 
                    type='button' 
                    onClick={handleSave}
                    className='w-24 h-10 border-1 border-gray-700 rounded-xl px-2 text-center cursor-pointer flex gap-2 items-center'
                >
                    <Save className='h-5 text-gray-700' />
                    Save
                </button>
                
            </div>
        </div>
    );
}
