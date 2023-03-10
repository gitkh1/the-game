import { T_AssetScheme } from "../types/assetScheme";
import { satisfies } from "../utils/satisfies";

import attack from "./sounds/attack.mp3";
import bite from "./sounds/bite.mp3";
import block from "./sounds/block.mp3";
import encounter from "./sounds/encounter.mp3";
import hit from "./sounds/hit.mp3";
import levelUp from "./sounds/level_up.mp3";
import potion from "./sounds/potion.mp3";
import uiConfirm from "./sounds/ui_confirm.mp3";

export const audioScheme = satisfies<T_AssetScheme>()({
  attack: attack,
  hit: hit,
  uiConfirm: uiConfirm,
  bite: bite,
  levelUp: levelUp,
  block: block,
  encounter: encounter,
  potion: potion,
});
