import './index.css';
import Controls from './components/Controls';
import GenreTags from './components/GenreTags';
import LoadModal from './components/LoadModal'
import SaveModal from './components/SaveModal';
import Sequencer from './components/Sequencer';
import Toast from './components/Toast';
import { SequencerContextProvider } from './lib/sequencerContext';

function App() {

  return (
    <SequencerContextProvider>
      <main className='min-w-screen min-h-screen px-[5vw] flex flex-col gap-4 items-center justify-center text-white relative'>
        <Sequencer />
        <Controls />
        <GenreTags />
      </main>

      {/* Modals */}
      <LoadModal />
      <SaveModal />
      <Toast />
    </SequencerContextProvider>
  )
}

export default App;