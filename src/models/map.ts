import { useState } from 'react';
import type { Scene } from '@antv/l7';

const useMap = () => {
  const [mapScene, setMapScene] = useState<Scene>();
  return { mapScene, setMapScene };
};
export default useMap;
