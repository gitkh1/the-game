import { FC, useEffect, useRef } from 'react';
import runGame from './runGame';

export const PlayGame: FC = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    return runGame({
      canvas: canvasRef.current,
    });
  }, [canvasRef.current]);

  return (
    <canvas ref={canvasRef}></canvas>
  );
};
