import type { DrumName, Pattern } from '@shared/types';
import { useSequencerContext } from '../lib/sequencerContext';
import { useEffect, useState } from 'react';

export default function Sequencer() {
    const { patternRef, currentStep, timeSig, isPlaying } = useSequencerContext();
    const [pattern, setPattern] = useState<Pattern>(patternRef.current);

    const toggleStep = (drum: DrumName, index: number) => {
        const updatedPattern = { ...patternRef.current };
        updatedPattern.steps[drum] = updatedPattern.steps[drum].map((step, i) =>
            i === index ? { active: !step.active } : step
        );
        patternRef.current = updatedPattern;
        setPattern(updatedPattern);
    };

    useEffect(() => {
        setPattern(patternRef.current);
    }, [patternRef.current]);

    const handleRename = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPattern(prev => ({...prev, name: e.target.value}));
        patternRef.current.name = e.target.value;
    }
    
    return (<>
        <div className='w-full flex items-center justify-center mb-2'>
            <input 
                value={pattern.name as string}
                onChange={(e) => handleRename(e)}
                className='border-1 border-gray-700 rounded-xl p-2 w-70 text-center text-2xl focus:outline-0'
            />
        </div>
        <div id='grid' className='flex flex-col border-1 border-gray-700 rounded-xl overflow-clip'>
            {Object.entries(pattern.steps).map(([drum, steps]) => (
                <div key={drum} className='flex border-b-1 last:border-b-0 border-gray-700'>
                    <div
                        id={`track-head-${drum}`}
                        className='h-[5vw] w-[10vw] bg-gray-900 p-4 flex items-center justify-start overflow-clip border-r-1 border-gray-700'
                    >{drum}</div>
                    {
                        steps.map((step, i) => (
                            <button 
                                key={`${drum}-${i}`} id={`${drum}-${i}`}
                                onClick={() => toggleStep(drum as DrumName, i)}
                                className='h-[5vw] w-[5vw] rounded-none hover:bg-white/20 cursor-pointer last:border-r-0 border-gray-700'
                                style={{ 
                                    background: 
                                        step.active ? 
                                            isPlaying && currentStep === i ? 'rgb(255,255,180)' : 'white'
                                        : isPlaying && currentStep === i ? 'rgba(255,255,0,0.2)' : 'transparent',
                                    borderColor: step.active ? '#1e2939' : '',
                                    borderRightWidth: i === steps.length - 1 ? 0
                                        : timeSig === '4/4' && (i + 1) % 4 === 0 ? '3px' 
                                        : timeSig === '3/4' && (i + 1) % 3 === 0 ? '3px' 
                                        : '1px',
                                }}
                            ></button>
                        ))
                    }
                </div>
            ))}
        </div>
    </>);
}
