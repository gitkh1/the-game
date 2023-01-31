import { E_EnemyState, T_PrimitiveEnemyType } from "../types/game";
import { randChoice, randFloat, randInt } from "../utils/random";

type T_Props = {
  x: number;
  y: number;
  jumpedEnemyChance: number;
};

export class Enemy {
  x: number;
  y: number;
  isJumpingType: boolean;
  type: T_PrimitiveEnemyType = randChoice(["SteamMan", "Woodcutter", "GraveRobber"]);
  targetDistance = Infinity;
  state = E_EnemyState.WALK;
  animationFrame = randInt(1000);

  constructor({ x, y, jumpedEnemyChance }: T_Props) {
    this.x = x;
    this.y = y;
    this.isJumpingType = randFloat(100) < jumpedEnemyChance;
  }

  setState(state: E_EnemyState) {
    this.state = state;
    if (state === E_EnemyState.WALK) {
      this.animationFrame = randInt(1000);
    } else {
      this.animationFrame = 0;
    }
  }
}
