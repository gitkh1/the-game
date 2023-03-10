/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { EventBus } from "./components/EventBus";
import { T_GameModel, T_GameState, T_PlayerState } from "./types/game";
import { assets } from "./assets";

export const configureDefaultGameModel = (canvas: HTMLCanvasElement): T_GameModel => {
  canvas.tabIndex = 1;
  const width = Number(canvas.width);
  const height = Number(canvas.height);
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.imageSmoothingEnabled = false;

  const model: T_GameModel = {
    canvas,
    context,
    events: new EventBus(),
    debug: false,
    world: {
      width,
      height,
      floorHeight: 65,
      deltaTime: 15 / 1000,
      killsForLevel: 5,
      state: T_GameState.LOADING,
      levelAnimationFrames: 0,
      setState(state: T_GameState) {
        this.state = state;
        this.levelAnimationFrames = 0;
        model.events.emit("world:state", state);
      },
    },
    mouse: {
      x: width / 2,
      y: height / 2,
    },
    player: {
      isRoundMana: false,
      mana: 30,
      maxMana: 30,
      manaPerSecond: 5,
      hp: 3,
      maxHp: 3,
      x: 50,
      width: 21,
      height: 48,
      kills: 0,
      level: 0,
      state: T_PlayerState.IDLE,
      animationFrame: 0,
      scale(scale: number) {
        this.width *= scale;
        this.height *= scale;
      },
      setState(state: T_PlayerState) {
        this.state = state;
        this.animationFrame = 0;
      },
    },
    enemyConfig: {
      width: 24,
      height: 48,
      speed: 80,
      spawnDelay: [500, 2000],
      currentSpawnDelay: 0,
      jumpHeight: 50,
      jumpLength: 50,
      jumpedEnemyChance: 10,
      scale(scale: number) {
        this.width *= scale;
        this.height *= scale;
      },
    },
    enemies: [],
    projectileConfig: {
      color: "hsl(130 80% 60%)",
      cost: 10,
      gravity: 500,
      radius: 3,
      velocity: 700,
      spreading: 20,
      scale(scale: number) {
        this.radius *= scale;
      },
    },
    projectiles: [],
    projectileTrailConfig: {
      maxAge: 10,
      spawnDelay: 1,
    },
    projectileTrails: [],
    effects: {
      max: 10,
      positive: {
        hp: 0,
        mana: 0,
        manaRegen: 0,
        accuracy: 0,
        projectileSize: 0,
      },
      negative: {
        jumpChance: 0,
        jumpLength: 0,
        jumpHeight: 0,
        walkSpeed: 0,
        spawnDelay: 0,
      },
    },
    gui: {
      leveling: {
        offsetTop: 150,
        fontSize: 32,
        gap: 5,
        header: "?? ?????? ???????? ???????? ??????????????????",
        clickEvent: "gui:leveling",
        items: [
          {
            enabled: true,
            isHover: false,
            textLeft: "?????????? ????????????????",
            textRight: "0",
            tag: "hp",
          },
          {
            enabled: true,
            isHover: false,
            textLeft: "?????????? ????????",
            textRight: "0",
            tag: "mana",
          },
          {
            enabled: true,
            isHover: false,
            textLeft: "???????????????????????????? ????????",
            textRight: "0",
            tag: "manaRegen",
          },
          {
            enabled: true,
            isHover: false,
            textLeft: "????????????????",
            textRight: "0",
            tag: "accuracy",
          },
          {
            enabled: true,
            isHover: false,
            textLeft: "???????????? ??????????????",
            textRight: "0",
            tag: "projectileSize",
          },
        ],
      },
    },
    isOutOfScreen(entityX: number, enitiyY: number, size: number) {
      const { width, height } = this.world;
      if (entityX < -size || entityX > width + size) return true;
      if (enitiyY < -size || enitiyY > height + size) return true;
      return false;
    },
    assets,
  };
  return model;
};
