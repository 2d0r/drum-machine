import { useEffect, useMemo, useState } from 'react'
import { getGenrePatterns } from '../lib/services';
import { useSequencerContext } from '../lib/sequencerContext';
import { detectGenre } from '../lib/utils';

export default function GenreTags() {
    const { pattern, genrePatterns, setGenrePatterns } = useSequencerContext();
    const [ genreMatches, setGenreMatches ] = useState<Record<string, number> | null>(null);

    useEffect(() => {
        getGenrePatterns()
            .then((res) => {
                setGenrePatterns(res.data);
                setGenreMatches(detectGenre(pattern, res.data));
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        setGenreMatches(detectGenre(pattern, genrePatterns));
    }, [pattern]);

    const sortedGenrePatterns = useMemo(() => {
        if (!genreMatches) return genrePatterns;
        return genrePatterns.sort((a, b) => genreMatches[b.name] - genreMatches[a.name])
    }, [genreMatches]);

    return (
        <div className='absolute bottom-8 w-full flex flex-wrap gap-2 justify-center'>
            {sortedGenrePatterns.map((genrePattern, idx) => {
                const match = genreMatches?.[genrePattern.name] || 0;
                return (
                    <div
                        key={`genre-pattern-${idx}`}
                        className='button-primary'
                        style={{ backgroundColor: `rgba(0, 168, 107, ${match >= 0.5 ? (match - 0.4) * 1.66 : 0})` }}
                    >{genrePattern.name}</div>
                )
            })}
        </div>
    );
}
