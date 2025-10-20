import { useEffect } from 'react';
import { useSequencerContext } from '../lib/sequencerContext';

export default function Toast() {
    const { toast, setToast } = useSequencerContext();

    useEffect(() => {
        let timeoutId = 0;
        if (toast) {
            timeoutId = setTimeout(() => {
                setToast('');
            }, 4000);
        }

        return () => clearTimeout(timeoutId);
    }, [toast]);



    return (toast ?
        <div className='absolute bottom-4 left-1/2 -translate-1/2 w-1/3 text-center p-2 border-1 border-gray-700 rounded-xl text-gray-700'>
            {toast}
        </div>
        : <></>
    )
}
