import { EventBus } from '../components/EventBus';
import { assets } from '../assets';
import { ReadonlyDeep } from './utils';
import { T_SimpleMenu } from './gui';
import { Projectile } from '../model/Projectile';
import { ProjectileTrail } from '../model/ProjectileTrail';
import { Enemy } from '../model/Enemy';

export type T_GameModel = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  events: EventBus;
  debug: boolean;
  world: {
    readonly width: number;
    readonly height: number;
    floorHeight: number;
    deltaTime: number;
    killsForLevel: number;
    state: T_GameState;
    levelAnimationFrames: number;
    setState(state: T_GameState): void;
  };
  mouse: {
    x: number;
    y: number;
  };
  player: T_Player;
  enemyConfig: {
    width: number;
    height: number;
    speed: number;
    spawnDelay: [number, number];
    currentSpawnDelay: number;
    jumpHeight: number;
    jumpLength: number;
    jumpedEnemyChance: number;
    scale(scale: number): void;
  };
  enemies: Enemy[];
  projectileConfig: {
    color: string;
    cost: number;
    gravity: number;
    radius: number;
    velocity: number;
    spreading: number;
    scale(scale: number): void;
  };
  projectiles: Projectile[];
  projectileTrailConfig: {
    maxAge: number;
    spawnDelay: number;
  };
  projectileTrails: ProjectileTrail[];
  effects: T_EffectPoints;
  gui: {
    leveling: T_SimpleMenu;
  };
  isOutOfScreen(entityX: number, enitiyY: number, size: number): boolean;
  assets: typeof assets;
};

export type T_Score = { kills: number; level: number };

export type T_GameModelReadOnly = ReadonlyDeep<T_GameModel>;

export enum T_GameState {
  LOADING,
  PLAY,
  LEVELING,
  PRE_END,
  END,
}

export enum T_PlayerState {
  IDLE,
  ATTACK,
  DEAD,
}

export type T_Player = {
  isRoundMana: boolean;
  mana: number;
  maxMana: number;
  manaPerSecond: number;
  hp: number;
  maxHp: number;
  x: number;
  width: number;
  height: number;
  kills: number;
  level: number;
  state: T_PlayerState;
  animationFrame: number;
  scale(scale: number): void;
  setState(state: T_PlayerState): void;
};

export enum E_EnemyState {
  WALK,
  ATTACK,
  DEAD,
}

export type T_PrimitiveEnemyType = 'SteamMan' | 'Woodcutter' | 'GraveRobber';

export type T_EffectPoints = {
  max: number;
  positive: {
    accuracy: number;
    projectileSize: number;
    hp: number;
    mana: number;
    manaRegen: number;
  };
  negative: {
    jumpChance: number;
    jumpLength: number;
    jumpHeight: number;
    walkSpeed: number;
    spawnDelay: number;
  };
};
