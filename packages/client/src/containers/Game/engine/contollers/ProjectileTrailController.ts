import { Projectile } from "../model/Projectile";
import { ProjectileTrail } from "../model/ProjectileTrail";
import { T_GameModel } from "../types/game";
import { distanceBetweenPoints } from "../utils/points";
import { randInt } from "../utils/random";

export class ProjectileTrailController {
  constructor(readonly model: T_GameModel) {}

  processAllTrails() {
    this.removeDead();
    this.incrementAgeForAll();
    this.spawnNewIfNeed();
  }

  incrementAgeForAll() {
    this.model.projectileTrails.forEach((trail) => this.incrementAge(trail));
  }

  incrementAge(trail: ProjectileTrail) {
    trail.age += 1;
  }

  removeDead() {
    const { maxAge } = this.model.projectileTrailConfig;

    const projectileTrails = this.model.projectileTrails.filter((p) => {
      return p.age < maxAge;
    });
    this.model.projectileTrails = projectileTrails;
  }

  spawnNewIfNeed() {
    this.model.projectiles.forEach((projectile) => {
      if (this.isTrailShouldSpawnForProjectile(projectile)) {
        this.spawnForProjectile(projectile);
      }
    });
  }

  isTrailShouldSpawnForProjectile(projectile: Projectile) {
    const trail = projectile.lastTrail;
    if (!trail) return true;

    return distanceBetweenPoints(trail, projectile) > 10;
  }

  spawnForProjectile(projectile: Projectile) {
    const color = `hsl(130 ${randInt(40, 85)}% ${randInt(40, 85)}% / ${randInt(60, 95)}%)`;

    const { x, y } = projectile;
    const trail = new ProjectileTrail({ x, y, color });
    projectile.lastTrail = trail;

    this.model.projectileTrails.push(trail);
  }
}
