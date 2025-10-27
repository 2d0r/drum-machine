import type { GenrePattern } from '@shared/types';
import { useEffect, useState } from 'react'
import { getGenrePatterns } from '../lib/services';
import { useSequencerContext } from '../lib/sequencerContext';

export default function GenreTags() {
    const { updateGenreTags, setUpdateGenreTags } = useSequencerContext();
    const [ genrePatterns, setGenrePatterns ] = useState<GenrePattern[]>([]);

    useEffect(() => {
        getGenrePatterns()
        .then((patterns) => {
            setGenrePatterns(patterns);
        })
        .catch(error => console.error(error));
    }, [ ]);

    useEffect(() => {
        if (updateGenreTags) {
            getGenrePatterns()
            .then((patterns) => {
                setGenrePatterns(patterns);
            })
            .catch(error => console.error(error));

            setUpdateGenreTags(false);
        }
    }, [ updateGenreTags ]);

    return (
        <div className='absolute bottom-8 w-full flex flex-wrap gap-2 justify-center'>
            {genrePatterns.map((pattern, idx) => {
                return (
                    <div 
                        key={`genre-pattern-${idx}`}
                        className='button-primary'
                    >{pattern.name}</div>
                )
            })}
        </div>
    );
}
