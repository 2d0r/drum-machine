import './App.css';
import Controls from './components/Controls';
import Grid from './components/Grid';

function App() {

  return (
    <main className='flex flex-col gap-4 text-white'>
      <Grid />
      <Controls />
    </main>
  )
}

export default App;