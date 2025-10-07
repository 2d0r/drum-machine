import { Play, Rewind, Shuffle } from 'lucide-react';

export default function Controls() {
  return (
    <div id='controls' className='h-10 flex items-center justify-center'>
        <div id='transport-controls' className='flex gap-8'>
          <Rewind color='white' fill='white' />
          <Play color='white' fill='white' />
          <Shuffle color='white' />
        </div>
    </div>
  )
}
