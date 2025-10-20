import { Columns2, Folder, Pause, Play, Save, Shuffle, Square, Timer } from 'lucide-react';
import * as Tone from 'tone';
import { useSequencerContext } from '../lib/sequencerContext';
import type { TimeSig } from '@shared/types';
import { useRef } from 'react';

export default function Controls() {
    const {
        sequence,
        isPlaying, setIsPlaying,
        currentStep, setCurrentStep,
        tempo, setTempo,
        timeSig, setTimeSig,
        patternRef,
        setToast, setFileLoadModal,
    } = useSequencerContext();
    const tempoDebounceRef = useRef<number | null>(null);

    const handlePlay = async () => {
        sequence?.start(currentStep);
        Tone.getTransport().start();
        setIsPlaying(true);
    };

    const handlePause = async () => {
        Tone.getTransport().stop();
        setIsPlaying(false);
    };

    const handleStop = async () => {
        Tone.getTransport().stop();
        Tone.getTransport().position = 0;
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const handleChangeTempo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTempo = Number(event.target.value);
        setTempo(newTempo);

        if (tempoDebounceRef.current) clearTimeout(tempoDebounceRef.current);

        tempoDebounceRef.current = setTimeout(() => {
            let clamped = newTempo;
            if (newTempo < 20) clamped = 20;
            if (newTempo > 300) clamped = 300;

            setTempo(clamped);
            Tone.getTransport().bpm.value = clamped;
        }, 1000);
    };

    const handleSelectTimeSignature = async (selection: TimeSig) => {
        setTimeSig(selection);
        await handleStop();
    };

    const handleSavePattern = async () => {
        const res = await fetch('http://localhost:4000/api/patterns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patternRef.current),
        });
        if (res.ok) {
            setToast('Saved pattern!');
        } else {
            setToast('Failed to save pattern!');
        }
    };

    const handleLoad = async () => {
        setFileLoadModal(true);
    }

    return (
        <div id='controls' className='h-10 flex items-center'>
            <div id='controls-left' className='flex gap-2 flex-1'>
                <div id='tempo' className='h-10 rounded-xl border-1 border-gray-700 px-2 flex gap-1 items-center justify-between cursor-pointer'>
                    <Timer className='text-gray-700 h-5' />
                    <input
                        value={tempo}
                        onChange={(e) => handleChangeTempo(e)}
                        type='number'
                        className='focus:outline-0 text-center'
                        min='20'
                        max='200'
                    />
                </div>
                <div id='time-signature' className='w-24 h-10 border-1 border-gray-700 rounded-xl flex gap-2 items-center justify-center cursor-pointer'>
                    <Columns2 className='h-5 text-gray-700' />
                    <select
                        onChange={(e) => handleSelectTimeSignature(e.target.value as TimeSig)}
                        className='text-center cursor-pointer'
                        defaultValue={timeSig}
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
                    onClick={handleLoad}
                    className='w-24 h-10 border-1 border-gray-700 rounded-xl px-2 text-center cursor-pointer flex gap-2 items-center'
                >
                    <Folder className='h-5 text-gray-700' />
                    Load
                </button>
                <button 
                    type='button' 
                    onClick={handleSavePattern}
                    className='w-24 h-10 border-1 border-gray-700 rounded-xl px-2 text-center cursor-pointer flex gap-2 items-center'
                >
                    <Save className='h-5 text-gray-700' />
                    Save
                </button>
                
            </div>
        </div>
    );
}
