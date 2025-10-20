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