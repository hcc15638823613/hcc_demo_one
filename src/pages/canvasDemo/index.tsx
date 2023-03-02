import { useRef } from 'react';

const CanvasDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  // const ctx = canvasRef?.current.getContext('2d');
  return (
    <div>
      <canvas
        id="canvasId"
        width="800"
        // ref={canvasRef}
        height="800"
        style={{ border: '1px solid green' }}
      ></canvas>
    </div>
  );
};
export default CanvasDemo;
