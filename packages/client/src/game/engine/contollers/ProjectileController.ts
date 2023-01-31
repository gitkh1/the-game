import { Projectile } from '../model/Projectile';
import { T_GameModel } from '../types/game';

export class ProjectileController {
  constructor(readonly model: T_GameModel) {}

  processAllProjectiles() {
    this.removeOutOfScreen();
    this.model.projectiles.forEach((projectile) => this.processEach(projectile));
  }

  removeOutOfScreen() {
    const { radius } = this.model.projectileConfig;

    const projectiles = this.model.projectiles.filter((p) => {
      return !this.model.isOutOfScreen(p.x, p.y, radius);
    });
    this.model.projectiles = projectiles;
  }

  processEach(projectile: Projectile) {
    this.incrementAge(projectile);
    this.processMove(projectile);

    projectile.onGround = this.calculateIsOnGround(projectile);

    if (projectile.onGround) {
      this.processSlowDown(projectile);
    }
  }

  incrementAge(projectile: Projectile) {
    projectile.age += 1;
  }

  processMove(projectile: Projectile) {
    const { deltaTime: dt } = this.model.world;
    const { gravity } = this.model.projectileConfig;

    projectile.x += projectile.dx * dt;
    projectile.y += projectile.dy * dt;
    projectile.dy += gravity * dt;
  }

  calculateIsOnGround(projectile: Projectile) {
    const { height, floorHeight } = this.model.world;
    const { radius } = this.model.projectileConfig;

    return projectile.y >= height - radius - floorHeight;
  }

  processSlowDown(projectile: Projectile) {
    projectile.dx = Math.max(0, projectile.dx * 0.5 - 10);
  }
}
