import { T_AssetScheme } from '../types/assetScheme';
import { satisfies } from '../utils/satisfies';

const pathes = import.meta.glob('./sounds/*.mp3', { as: 'url', eager: true });

export const audioScheme = satisfies<T_AssetScheme>()({
  attack: pathes['./sounds/attack.mp3'],
  hit: pathes['./sounds/hit.mp3'],
  uiConfirm: pathes['./sounds/ui_confirm.mp3'],
  bite: pathes['./sounds/bite.mp3'],
  levelUp: pathes['./sounds/level_up.mp3'],
  encounter: pathes['./sounds/encounter.mp3'],
});
