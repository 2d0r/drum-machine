import type { DrumName, Pattern } from '../shared/types';
import { useSequencerContext } from '../shared/sequencerContext';
import { useState } from 'react';

export default function Sequencer() {
    const { patternRef, currentStep } = useSequencerContext();
    const [pattern, setPattern] = useState<Pattern>(patternRef.current);

    const toggleStep = (drum: DrumName, index: number) => {
        const updated = { ...patternRef.current };
        updated[drum] = updated[drum].map((step, i) =>
            i === index ? { active: !step.active } : step
        );
        patternRef.current = updated;
        setPattern(updated);
    };
    
    return (
        <div id='grid' className='flex flex-col border-1 border-gray-700 rounded-xl'>
            {Object.entries(pattern).map(([drum, steps]) => (
                <div key={drum} className='flex border-b-1 last:border-b-0 border-gray-700'>
                    <div
                        id={`track-head-${drum}`}
                        className='h-[5vw] w-[10vw] p-4 flex items-center justify-start overflow-clip border-r-1 border-gray-700'
                    >{drum}</div>
                    {
                        steps.map((step, i) => (
                            <button 
                                key={`${drum}-${i}`} id={`${drum}-${i}`}
                                onClick={() => toggleStep(drum as DrumName, i)}
                                className='h-[5vw] w-[5vw] rounded-none hover:bg-white/20 cursor-pointer 
                                    border-r-1 last:border-r-0 border-gray-700'
                                style={{ 
                                    background: step.active ? currentStep === i ? 'rgb(255,255,180)' : 'white' 
                                        : currentStep === i ? 'rgba(255,255,0,0.2)' : 'transparent',
                                    borderColor: step.active ? '#1e2939' : '',
                                }}
                            ></button>
                        ))
                    }
                </div>
            ))}
        </div>
    );
}
