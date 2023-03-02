/* eslint-disable react/hook-use-state */
import { FC, useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as Sentry from "@sentry/react";

import gameBackground from "../../assets/images/game-page-bg.jpg";
import { Background } from "../../components/Background";
import { useUserInfo } from "../../global/hooks";
import { useLeaderboardSend } from "../../global/hooks/leaderboardHooks";
import { PATHS } from "../../routes";

import { GameRunner, T_GameState } from "./engine";

import classes from "./game.module.scss";

const WIDTH = 1200;
const HEIGHT = 700;

const useRerender = () => useReducer((i: number) => i + 1, 0)[1];

export const Game: FC = () => {
  const gameRunner = useState(() => new GameRunner())[0];
  const [gameState, setGameState] = useState<T_GameState>();
  const canvasRef = useRef(null);
  const user = useUserInfo();

  const navigate = useNavigate();
  const triggerRender = useRerender();
  const sendResult = useLeaderboardSend();

  const sendResultToServer = (score: number) => {
    if (user) {
      const fullname = `${user.first_name} ${user.second_name}`;
      sendResult({
        score,
        avatar: user.avatar,
        username: user.display_name || fullname,
      });
    }
  };

  const onGameFinished = (score: number) => {
    sendResultToServer(score);
    navigate(`${PATHS.GAMEOVER}?score=${score}`);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    gameRunner.setup(canvasRef.current as HTMLCanvasElement);
    gameRunner
      .loadResources()
      .then(() => {
        gameRunner.start();
      })
      .catch((error) => {
        Sentry.captureException(error);
      });
    gameRunner.onStateChanged(setGameState);

    return () => gameRunner.destroy();
  }, [gameRunner, canvasRef.current]);

  useEffect(() => {
    if (gameState === T_GameState.END) {
      const score = gameRunner.getScore();
      gameRunner.destroy();
      onGameFinished(score.kills);
    }
  }, [gameState, gameRunner, navigate]);

  const togglePlayPause = () => {
    gameRunner.isRunning ? gameRunner.stop() : gameRunner.start();
    triggerRender();
  };

  return (
    <Background src={gameBackground}>
      <Grid container maxWidth={WIDTH} direction="column" rowGap={2}>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Button component={Link} to={PATHS.MAIN_MENU} variant="contained" startIcon={<ArrowBackIosIcon />}>
              В меню
            </Button>
          </Grid>

          <Grid item>
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
        </Grid>

        <Grid sx={{ background: "black" }}>
          <canvas ref={canvasRef} className={classes["game-canvas"]} width={WIDTH} height={HEIGHT}></canvas>
        </Grid>
      </Grid>
    </Background>
  );
};
