import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { runGame } from './engine';
import classes from './game.module.scss';

type Score = { kills: number; level: number };

export const Game: FC = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasRef.current) return;

    const destroyGame = runGame(canvasRef.current, (newScore: Score) => {
      navigate(`/game-over?score=${newScore.kills}`);
    });

    return destroyGame;
  }, [canvasRef.current]);

  return <canvas className={classes['game-canvas']} ref={canvasRef} width={1200} height={700}></canvas>;
};
