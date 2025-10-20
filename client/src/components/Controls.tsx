import { Pause, Play, Shuffle, Square, Timer } from 'lucide-react';
import * as Tone from 'tone';
import { useSequencerContext } from '../shared/sequencerContext';

export default function Controls() {
  const {
    sequence, isPlaying, setIsPlaying, currentStep, setCurrentStep, tempo, setTempo,
  } = useSequencerContext();

  const handlePlay = async () => {
    sequence?.start(currentStep);
    Tone.getTransport().start();
    setIsPlaying(true);
  };

  const handlePause = async () => {
    Tone.getTransport().stop();
    setIsPlaying(false);
  }

  const handleStop = async () => {
    Tone.getTransport().stop();
    Tone.getTransport().position = 0;
    setCurrentStep(0);
    setIsPlaying(false);
  }

  const handleChangeTempo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTempo = Number(event.target.value);
    setTempo(newTempo);
    Tone.getTransport().bpm.value = newTempo;
  }
  const updateTempo = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') 
      Tone.getTransport().bpm.value = tempo;
  };

  return (
    <div id='controls' className='h-10 flex items-center justify-between'>
        <div id='tempo' className='flex gap-1 items-center justify-center'>
          <Timer className='text-gray-700' />
          <input
            value={tempo}
            onChange={(e) => handleChangeTempo(e)}
            onKeyDown={(e) => updateTempo(e)}
            type='number'
            className='w-24 border-1 border-gray-700 rounded-xl p-2 text-center'
            min={20}
            max={200}
          />
        </div>
        <div id='transport-controls' className='flex gap-8'>
          <Square className='text-white fill-white cursor-pointer' onClick={handleStop} />
          {isPlaying ? 
            <Pause className='text-white fill-white cursor-pointer' onClick={handlePause} />
            : <Play className='text-white fill-white cursor-pointer' onClick={handlePlay} />
          }
          <Shuffle className='text-white cursor-pointer' />
        </div>
        <div id='managePatterns'>

        </div>
    </div>
  )
}
