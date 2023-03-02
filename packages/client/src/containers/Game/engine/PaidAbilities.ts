import * as localForage from "localforage";

import { iconsScheme } from "./assets/icons";
import { T_Ability, T_GameModel } from "./types/game";

export async function getPaidAbilities() {
  const save = (id: string, count: number) => {
    abilitiesCount[id] = count;
    void localForage.setItem("abilities", { ...abilitiesCount });
  };

  let abilitiesCount: Record<string, number> = {};

  if (typeof window !== "undefined") {
    abilitiesCount = (await localForage.getItem("abilities")) ?? {};
  }

  const paidAbilities: T_Ability[] = [
    {
      id: "492f3fab-7d87-4de4-a24e-425c42d3f03d",
      name: "Лечебное зелье",
      icon: iconsScheme.healPotion,
      cost: 20,
      count: 0,
      buyAmount: 0,
      apply(this: T_Ability, model: T_GameModel) {
        const { hp, maxHp } = model.player;
        if (hp <= 0 || hp >= maxHp) {
          model.assets.audio.play("block");
          return false;
        }

        model.assets.audio.play("potion");
        model.player.hp += 1;
        this.addCount(-1);
        return true;
      },
      addCount(this: T_Ability, count) {
        this.count += count;
        save(this.id, this.count);
      },
    },
  ];

  paidAbilities.forEach((ability) => {
    ability.count = Math.max(Number(abilitiesCount[ability.id]) || 0, 0);
  });

  return paidAbilities;
}
