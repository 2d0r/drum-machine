import { XIcon } from 'lucide-react';
import { useSequencerContext } from '../lib/sequencerContext';
import { savePattern, saveGenrePattern, getGenrePatterns } from '../lib/services';
import { DEFAULT_PATTERN } from '../lib/constants';

export default function SaveModal() {
    const { 
        pattern, setPattern, setToast, modal, setModal, setGenrePatterns
    } = useSequencerContext();

    const handleSavePattern = async () => {
        const res = await savePattern(pattern);
        if (res?.ok) {
            setToast('Saved pattern!');
        } else {
            setToast('Failed to save pattern');
        }
        setModal(null);
        setPattern(DEFAULT_PATTERN);
    }

    const handleSaveGenrePattern = async () => {
        const res = await saveGenrePattern(pattern);
        if (res.ok) {
            setToast('Saved genre pattern!');
        } else {
            setToast('Failed to save genre pattern');
        }
        setModal(null);
        setPattern(DEFAULT_PATTERN);

        getGenrePatterns()
            .then((res) => {
                setGenrePatterns(res.data);
            })
            .catch(error => console.error(error));
    }

    const handleClose = () => {
        setModal(null);
    }

    return (modal === 'save' ? 
        <div className='absolute min-w-screen min-h-screen top-0 left-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[400px] min-h-24 max-h-[80vh] border-1 border-gray-700 rounded-xl overflow-clip bg-gray-950'>
                <div className='w-full h-10 border-b-1 border-gray-700 relative flex items-center justify-center text-gray-600'>
                    Save Pattern
                    <XIcon 
                        onClick={handleClose}
                        className='absolute right-2 text-gray-600 hover:text-white cursor-pointer' 
                    />
                </div>
                <div className='w-full p-4 flex gap-2 items-center justify-start'>
                    <span className='text-gray-600'>Name:</span>
                    <input
                        type='text'
                        value={pattern.name}
                        onChange={(e) => setPattern({ ...pattern, name: e.target.value })}
                        className='w-full button-primary text-center'
                    />
                </div>
                <div className='w-full flex gap-4 p-4 pt-0 items-center justify-center'>
                    <button
                        type='button'
                        onClick={handleSavePattern}
                        className='cursor-pointer button-secondary p-2'
                    >Save Pattern</button>
                    <button
                        type='button'
                        onClick={handleSaveGenrePattern}
                        className='cursor-pointer button-secondary p-2'
                    >Save Genre Pattern</button>
                </div>
            </div>
        </div> 
    : <></>)
}
