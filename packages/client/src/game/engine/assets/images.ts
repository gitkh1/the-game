import { T_AssetScheme } from "../types/assetScheme";
import { satisfies } from "../utils/satisfies";

import background from "./images/background.png";
import floor from "./images/floor.png";

export const imageScheme = satisfies<T_AssetScheme>()({
  background: background,
  floor: floor,
});
