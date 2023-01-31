/* eslint-disable react/hook-use-state */
import { FC, useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import gameBackground from "../assets/images/game-page-bg.jpg";
import { Background } from "../components/Background";
import { PATHS } from "../routes";

import { GameRunner, T_GameState } from "./engine";

import classes from "./game.module.scss";

const WIDTH = 1200;
const HEIGHT = 700;

const useRerender = () => useReducer((i: number) => i + 1, 0)[1];

export const Game: FC = () => {
  const gameRunner = useState(() => new GameRunner())[0];
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState<T_GameState>();
  const navigate = useNavigate();
  const triggerRender = useRerender();

  useEffect(() => {
    if (!canvasRef.current) return;

    gameRunner.setup(canvasRef.current as HTMLCanvasElement);
    gameRunner
      .loadResources()
      .then(() => {
        gameRunner.start();
      })
      .catch((e) => console.log(e));
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
    <Background src={gameBackground}>
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

        <Box sx={{ background: "black" }}>
          <canvas ref={canvasRef} className={classes["game-canvas"]} width={WIDTH} height={HEIGHT}></canvas>
        </Box>
      </Grid>
    </Background>
  );
};
