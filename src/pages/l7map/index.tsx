import type { Scene } from '@antv/l7';
import { AMapScene, SceneEvent } from '@antv/l7-react';
import { useModel } from 'umi';

const L7Map = () => {
  const { setMapScene } = useModel('map');
  const onSceneLoaded = (scenes: Scene) => {
    setMapScene(scenes);
  };
  return (
    <AMapScene
      onSceneLoaded={onSceneLoaded}
      map={{
        pitch: 1,
        style: 'light',
        zoom: 10,
        token: 'd2b58714b1210fd7935f227b25e7a78d',
        logoVisible: true,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <SceneEvent
        type="click"
        handler={(e: any) => {
          console.log(e);
        }}
      />
    </AMapScene>
  );
};
export default L7Map;
