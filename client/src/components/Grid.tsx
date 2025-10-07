export default function Grid() {
    const NUM_ROWS = 6;
    const NUM_COLS = 12;
    const rows = Array.from(Array(NUM_ROWS).keys());
    const cols = Array.from(Array(NUM_COLS + 1).keys());
    
    return (
        <div id='grid' className='flex flex-col'>
            {rows.map((_, rowIdx) => {
                return <div key={`row-${rowIdx}`} className='flex'>
                    {cols.map((_, colIdx) => {
                    if (colIdx === 0) {
                        return (
                        <div
                            key={`head-${rowIdx}`}
                            id={`track-head-${rowIdx}`}
                            className='h-20 w-40 border-1 border-white/20'
                        ></div>
                        )
                    }
                    return (
                        <div 
                        key={`pad-${rowIdx}-${colIdx - 1}`} 
                        id={`pad-${rowIdx}-${colIdx - 1}`} 
                        className='h-20 w-20 border-1 border-white/20 hover:bg-white/20'
                        ></div>
                    )
                    })}
                </div>
                
            })}
        </div>
    );
}
