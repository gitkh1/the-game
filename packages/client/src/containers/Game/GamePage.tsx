/* eslint-disable react/hook-use-state */
import { FC, useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PauseIcon from "@mui/icons-material/Pause";
import PlayIcon from "@mui/icons-material/PlayArrow";
import ShopIcon from "@mui/icons-material/Shop";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as Sentry from "@sentry/react";

import gameBackground from "../../assets/images/main-page-bg.jpg";
import { Background } from "../../components/Background";
import { useUserInfo } from "../../global/hooks";
import { useLeaderboardSend } from "../../global/hooks/leaderboardHooks";
import { PATHS } from "../../routes";

import { AbilitiesList, ShopDialog, SimpleOverlay } from "./components";
import { GameRunner, getPaidAbilities, T_Ability, T_GameState } from "./engine";

import classes from "./game.module.scss";

const WIDTH = 1200;
const HEIGHT = 700;

const useRerender = () => useReducer((i: number) => i + 1, 0)[1];

type T_GameStage = "PAUSE" | "PLAY" | "SHOP";

export const Game: FC = () => {
  const [stage, setStage] = useState<T_GameStage>("PLAY");

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

  const isPlayed = stage === "PLAY";

  useEffect(() => {
    isPlayed ? gameRunner.start() : gameRunner.stop();
  }, [isPlayed]);

  const [shopItems, setShopItems] = useState<T_Ability[]>([]);
  useEffect(() => {
    void getPaidAbilities().then(setShopItems);
  }, []);
  const setAbilityAmount = (index: number, amount: number) => {
    const newItems = shopItems.slice();
    newItems[index].buyAmount = amount;
    setShopItems(newItems);
  };
  const handleBuyingAbilities = () => {
    const newItems = shopItems.slice();
    newItems.forEach((item) => {
      item.addCount(item.buyAmount);
      item.buyAmount = 0;
    });
    setShopItems(newItems);
  };

  const handleShopDialogClose = () => {
    setShopItems(
      shopItems.map((item) => {
        item.buyAmount = 0;
        return item;
      }),
    );
    setStage("PLAY");
  };

  return (
    <Background src={gameBackground}>
      <ShopDialog
        items={shopItems}
        setAmount={setAbilityAmount}
        open={stage === "SHOP"}
        onClose={handleShopDialogClose}
        onBuy={handleBuyingAbilities}
      />

      <Grid container maxWidth={WIDTH} direction="column" rowGap={2}>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Button component={Link} to={PATHS.MAIN_MENU} variant="contained" startIcon={<ArrowBackIosIcon />}>
              В меню
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" startIcon={<ShopIcon />} onClick={() => setStage("SHOP")}>
              Магазин
            </Button>
          </Grid>

          <Grid item xs={1} container justifyContent="flex-end">
            <Grid item>
              {isPlayed ? (
                <Button variant="contained" onClick={() => setStage("PAUSE")} startIcon={<PauseIcon />}>
                  Пауза
                </Button>
              ) : (
                <Button variant="contained" onClick={() => setStage("PLAY")} startIcon={<PlayIcon />}>
                  Продолжить
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ background: "black", position: "relative" }}>
          <canvas ref={canvasRef} className={classes["game-canvas"]} width={WIDTH} height={HEIGHT}></canvas>

          <AbilitiesList
            abilites={shopItems}
            inset="10px auto auto -64px"
            shown={gameState === T_GameState.PLAY || gameState === T_GameState.LEVELING}
            applyAbility={(ability) => gameRunner.applyAbility(ability) && triggerRender()}
          />

          <SimpleOverlay open={stage === "PAUSE"}>Игра на паузе</SimpleOverlay>
        </Grid>
      </Grid>
    </Background>
  );
};
