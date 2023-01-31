import { Enemy } from "../model/Enemy";
import { E_EnemyState, T_GameModel } from "../types/game";
import { randInt } from "../utils/random";

export class EnemyController {
  constructor(readonly model: T_GameModel) {}

  processAllEnemies() {
    this.removeOutScreen();
    this.removeDead();
    this.spawnNewEnemyIfNeed();
    this.model.enemies.forEach((enemy) => this.processEach(enemy));
  }

  removeOutScreen() {
    const { height } = this.model.enemyConfig;

    const enemies = this.model.enemies.filter((enemy) => {
      return !this.model.isOutOfScreen(enemy.x, enemy.y, height);
    });
    this.model.enemies = enemies;
  }

  removeDead() {
    const deadFrames = 30;
    const enemies = this.model.enemies.filter((enemy) => {
      if (enemy.state !== E_EnemyState.DEAD) {
        return true;
      }
      return enemy.animationFrame < deadFrames;
    });
    this.model.enemies = enemies;
  }

  processEach(enemy: Enemy) {
    this.incrementAnimationFrame(enemy);
    enemy.targetDistance = this.calculateDistanceToPlayer(enemy);

    switch (enemy.state) {
      case E_EnemyState.WALK:
        this.processWalkState(enemy);
        break;

      case E_EnemyState.ATTACK:
        this.processAttackState(enemy);
        break;
    }
  }

  incrementAnimationFrame(enemy: Enemy) {
    enemy.animationFrame += 1;
  }

  calculateDistanceToPlayer(enemy: Enemy) {
    const player = this.model.player;
    if (player.hp <= 0) return Infinity;

    return Math.hypot(enemy.x - player.x - player.width, 0);
  }

  processWalkState(enemy: Enemy) {
    if (this.isEnemyCanAttack(enemy)) {
      enemy.setState(E_EnemyState.ATTACK);
      return;
    }
    this.doEnemyWalk(enemy);
  }

  processAttackState(enemy: Enemy) {
    if (!this.isEnemyCanAttack(enemy)) {
      enemy.setState(E_EnemyState.WALK);
      return;
    }
    this.doEnemyAttack(enemy);
  }

  isEnemyCanAttack(enemy: Enemy) {
    return enemy.targetDistance < 10;
  }

  doEnemyWalk(enemy: Enemy) {
    const { height: worldHeight, floorHeight, deltaTime: dt } = this.model.world;
    const { jumpHeight, jumpLength, height } = this.model.enemyConfig;
    const enemyY = worldHeight - floorHeight - height;
    const speed = this.model.enemyConfig.speed;

    const isNearPlayerOnGround = enemy.targetDistance < jumpLength && enemy.y > enemyY - 2;
    if (enemy.isJumpingType && isNearPlayerOnGround) {
      enemy.isJumpingType = false;
    }

    enemy.y = enemyY;

    if (enemy.isJumpingType) {
      const time = (dt * 1000) / 15 / 15;
      const left = enemy.animationFrame * time;
      const right = (enemy.animationFrame - 1) * time;
      const deltaX = Math.sin(left) - Math.sin(right);
      const deltaSin = Math.min(deltaX, 0) / 2;
      enemy.x += deltaSin * jumpLength;

      const cos = Math.min(0, Math.cos(enemy.animationFrame * time));
      const delta = Math.min(cos, 0);
      enemy.y += delta * jumpHeight;
    } else {
      enemy.x -= speed * dt;
    }
  }

  doEnemyAttack(enemy: Enemy) {
    const { hp } = this.model.player;
    const canAttack = enemy.animationFrame % 30 === 0;
    if (canAttack) {
      this.model.player.hp = Math.max(0, hp - 1);
      this.model.assets.audio.play("bite");
    }
  }

  spawnNewEnemyIfNeed() {
    const { deltaTime: dt } = this.model.world;
    let { currentSpawnDelay } = this.model.enemyConfig;
    const {
      spawnDelay: [min, max],
    } = this.model.enemyConfig;

    if (currentSpawnDelay <= 0) {
      currentSpawnDelay = randInt(min, max) / 1000;

      this.spawnEnemy();
    }
    currentSpawnDelay -= dt;

    this.model.enemyConfig.currentSpawnDelay = currentSpawnDelay;
  }

  spawnEnemy() {
    const { width } = this.model.world;
    const { jumpedEnemyChance } = this.model.enemyConfig;

    const x = width + 1;
    const y = 500;
    this.model.enemies.push(new Enemy({ x, y, jumpedEnemyChance }));
  }
}
