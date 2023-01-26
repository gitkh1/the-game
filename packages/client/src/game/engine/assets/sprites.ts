import { T_SpriteProps } from '../components/Sprite';
import { T_AssetScheme } from '../types/assetScheme';
import { T_PrimitiveEnemyType } from '../types/game';
import { satisfies } from '../utils/satisfies';

type T_AnimationType = 'Walk' | 'Attack' | 'Dead' | 'Jump';

const pathes = import.meta.glob('./sprites/**/*.png', { as: 'url', eager: true });

export const spriteScheme = satisfies<T_AssetScheme>()({
  playerIdle: {
    url: pathes['./sprites/player-idle.png'],
    frames: 8,
    frameDelay: 10,
    hitboxX: 48,
    hitboxY: 64,
    hitboxW: 28,
    hitboxH: 64,
  },
  playerAttack: {
    url: pathes['./sprites/player-attack.png'],
    frames: 7,
    frameDelay: 4,
    hitboxX: 35,
    hitboxY: 64,
    hitboxW: 28,
    hitboxH: 64,
  },
  playerDead: {
    url: pathes['./sprites/player-dead.png'],
    frames: 4,
    frameDelay: 4,
    hitboxX: 35,
    hitboxY: 64,
    hitboxW: 28,
    hitboxH: 64,
    looped: false,
  },

  ...generateEnemyScheme('SteamMan'),
  ...generateEnemyScheme('GraveRobber'),
  ...generateEnemyScheme('Woodcutter'),

  hp: {
    url: pathes['./sprites/hp-dots.png'],
    frames: 2,
  },
  mana: {
    url: pathes['./sprites/mana-dots.png'],
    frames: 2,
  },
});

function generateEnemyScheme<T extends T_PrimitiveEnemyType>(name: T) {
  return {
    [name + 'Walk']: {
      url: pathes[`./sprites/enemies/${name}/run.png`],
      frames: 6,
      frameDelay: 6,
      hitboxX: 10,
      hitboxY: 14,
      hitboxW: 17,
      hitboxH: 34,
    },
    [name + 'Attack']: {
      url: pathes[`./sprites/enemies/${name}/attack.png`],
      frames: 6,
      frameDelay: 6,
      hitboxX: 10,
      hitboxY: 14,
      hitboxW: 17,
      hitboxH: 34,
    },
    [name + 'Dead']: {
      url: pathes[`./sprites/enemies/${name}/death.png`],
      frames: 6,
      frameDelay: 6,
      hitboxX: 10,
      hitboxY: 14,
      hitboxW: 17,
      hitboxH: 34,
      looped: false,
    },
    [name + 'Jump']: {
      url: pathes[`./sprites/enemies/${name}/idle.png`],
      frames: 4,
      frameDelay: 6,
      hitboxX: 10,
      hitboxY: 14,
      hitboxW: 17,
      hitboxH: 34,
    },
  } as Record<`${T}${T_AnimationType}`, T_SpriteProps>;
}
