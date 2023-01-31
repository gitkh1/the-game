import { T_SpriteProps } from "../components/Sprite";
import { T_AssetScheme } from "../types/assetScheme";
import { T_PrimitiveEnemyType } from "../types/game";
import { satisfies } from "../utils/satisfies";

type T_AnimationType = "Walk" | "Attack" | "Dead" | "Jump";

import graveRobberAttack from "./sprites/enemies/GraveRobber/attack.png";
import graveRobberDeath from "./sprites/enemies/GraveRobber/death.png";
import graveRobberIdle from "./sprites/enemies/GraveRobber/idle.png";
import graveRobberRun from "./sprites/enemies/GraveRobber/run.png";
import steamManAttack from "./sprites/enemies/SteamMan/attack.png";
import steamManDeath from "./sprites/enemies/SteamMan/death.png";
import steamManIdle from "./sprites/enemies/SteamMan/idle.png";
import steamManRun from "./sprites/enemies/SteamMan/run.png";
import woodcutterAttack from "./sprites/enemies/Woodcutter/attack.png";
import woodcutterDeath from "./sprites/enemies/Woodcutter/death.png";
import woodcutterIdle from "./sprites/enemies/Woodcutter/idle.png";
import woodcutterRun from "./sprites/enemies/Woodcutter/run.png";
import hpDots from "./sprites/hp-dots.png";
import manaDots from "./sprites/mana-dots.png";
import playerAttack from "./sprites/player-attack.png";
import playerDead from "./sprites/player-dead.png";
import playerIdle from "./sprites/player-idle.png";

export const spriteScheme = satisfies<T_AssetScheme>()({
  playerIdle: {
    url: playerIdle,
    frames: 8,
    frameDelay: 10,
    hitboxX: 48,
    hitboxY: 64,
    hitboxW: 28,
    hitboxH: 64,
  },
  playerAttack: {
    url: playerAttack,
    frames: 7,
    frameDelay: 4,
    hitboxX: 35,
    hitboxY: 64,
    hitboxW: 28,
    hitboxH: 64,
  },
  playerDead: {
    url: playerDead,
    frames: 4,
    frameDelay: 4,
    hitboxX: 35,
    hitboxY: 64,
    hitboxW: 28,
    hitboxH: 64,
    looped: false,
  },

  ...generateEnemyScheme("SteamMan", steamManRun, steamManAttack, steamManDeath, steamManIdle),
  ...generateEnemyScheme("GraveRobber", graveRobberRun, graveRobberAttack, graveRobberDeath, graveRobberIdle),
  ...generateEnemyScheme("Woodcutter", woodcutterRun, woodcutterAttack, woodcutterDeath, woodcutterIdle),

  hp: {
    url: hpDots,
    frames: 2,
  },
  mana: {
    url: manaDots,
    frames: 2,
  },
});

function generateEnemyScheme<T extends T_PrimitiveEnemyType>(name: T, walk: string, attack: string, dead: string, jump: string) {
  return {
    [name + "Walk"]: {
      url: walk,
      frames: 6,
      frameDelay: 6,
      hitboxX: 10,
      hitboxY: 14,
      hitboxW: 17,
      hitboxH: 34,
    },
    [name + "Attack"]: {
      url: attack,
      frames: 6,
      frameDelay: 6,
      hitboxX: 10,
      hitboxY: 14,
      hitboxW: 17,
      hitboxH: 34,
    },
    [name + "Dead"]: {
      url: dead,
      frames: 6,
      frameDelay: 6,
      hitboxX: 10,
      hitboxY: 14,
      hitboxW: 17,
      hitboxH: 34,
      looped: false,
    },
    [name + "Jump"]: {
      url: jump,
      frames: 4,
      frameDelay: 6,
      hitboxX: 10,
      hitboxY: 14,
      hitboxW: 17,
      hitboxH: 34,
    },
  } as Record<`${T}${T_AnimationType}`, T_SpriteProps>;
}
