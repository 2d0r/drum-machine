import './App.css';
import Controls from './components/Controls';
import Sequencer from './components/Sequencer';
import { SequencerContextProvider } from './shared/sequencerContext';

function App() {

  return (
    <SequencerContextProvider>
      <main className='flex flex-col gap-4 text-white'>
        <Sequencer />
        <Controls />
      </main>
    </SequencerContextProvider>
  )
}

export default App;