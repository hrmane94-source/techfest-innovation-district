export * from './CityEnvironment';
export * from './CityGround';
export * from './CityRoads';

import type { EnvironmentConfig } from '../../types/scene';

export const DEFAULT_ENVIRONMENT_CONFIG: EnvironmentConfig = {
  fogColor: '#050A14',
  fogNear: 45,
  fogFar: 230,
  gridEnabled: true,
};
