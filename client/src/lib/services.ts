import type { GenrePattern, Pattern } from '@shared/types';

// PATTERNS

export const getPatterns = async () => {
    try {
        const res = await fetch('http://localhost:4000/api/patterns');
        const json = await res.json();
        if (res.ok) {
            return json.data;
        } else {
            console.error(json.message || json.error || 'Unknown error');
            return [];
        }
    } catch (error) {
        console.error('Network error:', error);
        return [];
    }
}

export const savePattern = async (pattern: Pattern) => {
    try {
        const res = await fetch('http://localhost:4000/api/patterns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...pattern, _id: null }),
        });
        return res;
    } catch (error) {
        console.error('Failed request to save pattern', error);
        return null;
    }
}

export const deletePattern = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:4000/api/patterns/${id}`, {
            method: 'DELETE',
        });
        const json = await res.json();
        if (res.ok) {
            return json.data;
        } else {
            console.error(json.data || 'Unknown error');
            return [];
        }
    } catch (error) {
        console.error('Failed request to delete pattern', error);
        return [];
    }
}

// GENRE PATTERNS

export const getGenrePatterns = async (): Promise<{
    ok: boolean; data: GenrePattern[]; error?: string
}> => {
    try {
        const res = await fetch('http://localhost:4000/api/genre-patterns');
        const json = await res.json();

        if (!res.ok) {
            return { ok: false, data: [], error: json.message || json.error || 'Unknown error' };
        }
        return { ok: true, data: json.data };
    } catch (error) {
        console.error('Failed request to get genre patterns:', error);
        return { ok: false, data: [], error: String(error) };
    }
}

export const saveGenrePattern = async ( pattern: GenrePattern ) : Promise<{ 
    ok: boolean; data?: GenrePattern; error?: string 
}> => {
    try {
        const res = await fetch('http://localhost:4000/api/genre-patterns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...pattern, _id: null }),
        });
        const json = await res.json();

        if (!res.ok) {
        return { ok: false, error: json.message || json.error || 'Failed to save genre pattern' };
        }
        return { ok: true, data: json.data };
    } catch (error) {
        console.error('Failed request to save genre pattern:', error);
        return { ok: false, error: String(error) };
    }
}
