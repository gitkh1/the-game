import { Enemy } from '../model/Enemy';
import { Projectile } from '../model/Projectile';
import { E_EnemyState, T_GameModel } from '../types/game';
import { isPointInsideRect } from '../utils/points';

type T_Callback<Q, E> = (left: Q, right: E) => unknown;

export class CollisionController {
  constructor(readonly model: T_GameModel) {}

  processForAllEnemiesAndProjectile(callback: T_Callback<Enemy, Projectile>) {
    const { radius } = this.model.projectileConfig;

    const enemies = this.model.enemies;
    const projectiles = this.model.projectiles;

    enemies.forEach((enemy) => {
      if (enemy.state === E_EnemyState.DEAD) return;

      const enemyRect = this.getEnemyRectWithBorder(enemy, radius);

      const proj = projectiles.find((projectile) => {
        return isPointInsideRect(projectile, enemyRect);
      });
      if (proj) {
        callback(enemy, proj);
      }
    });
  }

  getEnemyRectWithBorder(enemy: Enemy, borderWidth: number) {
    const { width, height } = this.model.enemyConfig;

    return {
      left: enemy.x - borderWidth,
      right: enemy.x + width + borderWidth,
      top: enemy.y - borderWidth,
      bottom: enemy.y + height + borderWidth,
    };
  }
}
