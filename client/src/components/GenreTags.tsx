import type { GenrePattern } from '@shared/types';
import { useEffect, useState } from 'react'
import { getGenrePatterns } from '../lib/services';
import { useSequencerContext } from '../lib/sequencerContext';
import { detectGenre } from '../lib/utils';

export default function GenreTags() {
    const { genreTagsStatus, setGenreTagsStatus, patternRef } = useSequencerContext();
    const [ genrePatterns, setGenrePatterns ] = useState<GenrePattern[]>([]);
    const [ genreMatches, setGenreMatches ] = useState<Record<string, number> | null>(null);

    useEffect(() => {
        if (genreTagsStatus === 'load' || genrePatterns.length === 0) {
            getGenrePatterns()
            .then((res) => {
                setGenrePatterns(res.data);
            })
            .catch(error => console.error(error));

            detectGenre(patternRef.current)
            .then((matches) => {
                if (matches) setGenreMatches(matches);
            })
            .catch(error => console.error(error));

            setGenreTagsStatus('ready');
        } else if (genreTagsStatus === 'detect') {
            detectGenre(patternRef.current)
            .then((matches) => {
                if (matches) setGenreMatches(matches);
            })
            .catch(error => console.error(error));

            setGenreTagsStatus('ready');
        }
    }, [ genreTagsStatus ]);

    return (
        <div className='absolute bottom-8 w-full flex flex-wrap gap-2 justify-center'>
            {genrePatterns.map((genrePattern, idx) => {
                const match = genreMatches?.[genrePattern.name] || 0;
                return (
                    <div 
                        key={`genre-pattern-${idx}`}
                        className='button-primary'
                        style={{ backgroundColor: `rgba(0, 168, 107, ${match >= 0.5 ? match : 0})` }}
                    >{genrePattern.name}</div>
                )
            })}
        </div>
    );
}
