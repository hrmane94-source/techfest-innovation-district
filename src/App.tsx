import { AppShell } from './components/layout';
import { CityScene } from './scene';

export function App() {
  return (
    <AppShell canvasSlot={<CityScene />} />
  );
}

export default App;
