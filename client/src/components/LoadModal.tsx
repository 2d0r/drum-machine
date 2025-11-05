import { Trash, XIcon } from 'lucide-react';
import { useSequencerContext } from '../lib/sequencerContext'
import { useEffect, useState } from 'react';
import { type Pattern } from '@shared/types';
import { deletePattern, getPatterns } from '../lib/services';

export default function LoadModal() {
    const { modal, setModal, setPattern } = useSequencerContext();
    const [patterns, setPatterns] = useState<Pattern[] | null>(null);

    useEffect(() => {
        if (modal === 'load') {
            getPatterns()
                .then(newPatterns => {
                    setPatterns(newPatterns);
                })
                .catch(error => console.error(error));
        }
    }, [modal]);

    const handleLoadPattern = (pattern: Pattern) => {
        setPattern(pattern);
        setModal(null);
    }

    const handleDeletePattern = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, patternId: string) => {
        e.stopPropagation();
        try {
            await deletePattern(patternId);
            setPatterns(prev => prev?.filter(p => p._id !== patternId) as Pattern[]);
        } catch (error) {
            console.log(error);
        }

    }
    
    const handleClose = () => {
        setPatterns([]);
        setModal(null);
    }

    return (modal === 'load' ? 
        <div className='absolute min-w-screen min-h-screen top-0 left-0 bg-black/60 flex items-center justify-center'>
            <div className='w-80 min-h-24 max-h-[80vh] border-1 border-gray-700 rounded-xl overflow-clip bg-gray-950'>
                <div className='w-full h-10 border-b-1 border-gray-700 relative flex items-center justify-center text-gray-600'>
                    Load Pattern
                    <XIcon 
                        onClick={handleClose}
                        className='absolute right-2 text-gray-600 hover:text-white cursor-pointer' 
                    />
                </div>
                {patterns?.length ? patterns?.map((pattern, idx) => {
                    return (
                        <div key={`pattern-${idx}`} 
                            onClick={() => handleLoadPattern(pattern)}
                            className='w-full h-10 border-b-1 border-gray-800 flex items-center justify-between pl-4 pr-2 cursor-pointer hover:bg-gray-900/50'
                        >
                            {pattern.name}
                            <Trash 
                                className='h-4 text-gray-600/50 hover:text-white/50' 
                                onClick={(e) => handleDeletePattern(e, pattern._id as string)}
                            />
                        </div>
                    )
                }) : <></>}
            </div>
        </div> : <></>
    );
}
