import './App.css';
import Controls from './components/Controls';
import FileLoadModal from './components/FileLoadModal';
import Sequencer from './components/Sequencer';
import Toast from './components/Toast';
import { SequencerContextProvider } from './lib/sequencerContext';

function App() {

  return (
    <SequencerContextProvider>
      <main className='flex flex-col gap-4 text-white relative'>
        <Sequencer />
        <Controls />
      </main>
      <FileLoadModal />
      <Toast />
    </SequencerContextProvider>
  )
}

export default App;