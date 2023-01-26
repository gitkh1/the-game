import { EventBus } from './components/EventBus';
import { assets } from './assets';
import { T_GameModel, T_GameState, T_PlayerState } from './types/game';

type ConfigureFn = (canvas: HTMLCanvasElement) => T_GameModel;
export const configureDefaultGameModel: ConfigureFn = (canvas) => {
  const width = Number(canvas.width);
  const height = Number(canvas.height);
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.imageSmoothingEnabled = false;

  return {
    canvas,
    context,
    events: new EventBus(),
    debug: false,
    world: {
      width,
      height,
      floorHeight: 65,
      deltaTimeMS: 15 / 1000,
      killsForLevel: 5,
      state: T_GameState.PLAY,
      levelAnimationFrames: 0,
      setState(state: T_GameState) {
        this.state = state;
        this.levelAnimationFrames = 0;
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
      color: 'hsl(130 80% 60%)',
      cost: 10,
      gravity: 500,
      radius: 3,
      velocity: 700,
      spreading: 20,
      rotateSpeed: 2,
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
        header: 'У вас одно очко улучшения',
        clickEvent: 'gui:leveling',
        items: [
          {
            enabled: true,
            isHover: false,
            textLeft: 'Запас здоровья',
            textRight: '0',
            tag: 'hp',
          },
          {
            enabled: true,
            isHover: false,
            textLeft: 'Запас маны',
            textRight: '0',
            tag: 'mana',
          },
          {
            enabled: true,
            isHover: false,
            textLeft: 'Восстановление маны',
            textRight: '0',
            tag: 'manaRegen',
          },
          {
            enabled: true,
            isHover: false,
            textLeft: 'Точность',
            textRight: '0',
            tag: 'accuracy',
          },
          {
            enabled: true,
            isHover: false,
            textLeft: 'Размер снаряда',
            textRight: '0',
            tag: 'projectileSize',
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
};
