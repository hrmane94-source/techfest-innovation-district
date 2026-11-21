import { DistrictProvider } from './context';
import { AppShell } from './components/layout';
import { CityScene } from './scene';

export function App() {
  return (
    <DistrictProvider>
      <AppShell canvasSlot={<CityScene />} />
    </DistrictProvider>
  );
}

export default App;
