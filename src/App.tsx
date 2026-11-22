import { DistrictProvider, GraphicsQualityProvider } from './context';
import { AppShell } from './components/layout';
import { CityScene } from './scene';

export function App() {
  return (
    <GraphicsQualityProvider>
      <DistrictProvider>
        <AppShell canvasSlot={<CityScene />} />
      </DistrictProvider>
    </GraphicsQualityProvider>
  );
}

export default App;

