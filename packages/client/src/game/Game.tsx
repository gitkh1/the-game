import { FC, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameRunner } from './engine';
import { T_GameState } from './engine';
import gameBackground from '../assets/images/game-page-bg.jpg';
import classes from './game.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PATHS } from '../routes';

const WIDTH = 1200;
const HEIGHT = 700;

const useRerender = () => useReducer((i) => i + 1, 0)[1];

export const Game: FC = () => {
  const [gameRunner] = useState(() => new GameRunner());
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState<T_GameState>();
  const navigate = useNavigate();
  const triggerRender = useRerender();

  useEffect(() => {
    if (!canvasRef.current) return;

    gameRunner.setup(canvasRef.current);
    gameRunner.loadResources().then(() => {
      gameRunner.start();
    });
    gameRunner.onStateChanged(setGameState);

    return () => gameRunner.destroy();
  }, [gameRunner, canvasRef.current]);

  useEffect(() => {
    if (gameState === T_GameState.END) {
      const score = gameRunner.getScore();
      gameRunner.destroy();
      navigate(`${PATHS.GAMEOVER}?score=${score.kills}`);
    }
  }, [gameState, gameRunner, navigate]);

  const togglePlayPause = () => {
    gameRunner.isRunning ? gameRunner.stop() : gameRunner.start();
    triggerRender();
  };

  return (
    <div className={classes['container']}>
      <img src={gameBackground} alt="game-page-background" className={classes['background']} />

      <Grid maxWidth={WIDTH} direction="column" spacing={24}>
        <Grid container justifyContent="space-between">
          <Button component={Link} to={PATHS.MAIN_MENU} variant="contained" startIcon={<ArrowBackIosIcon />}>
            В меню
          </Button>

          {gameRunner.isRunning ? (
            <Button variant="contained" onClick={togglePlayPause}>
              Пауза
            </Button>
          ) : (
            <Button variant="contained" onClick={togglePlayPause}>
              Продолжить
            </Button>
          )}
        </Grid>

        <Box sx={{ background: 'black' }}>
          <canvas ref={canvasRef} className={classes['game-canvas']} width={WIDTH} height={HEIGHT}></canvas>
        </Box>
      </Grid>
    </div>
  );
};
