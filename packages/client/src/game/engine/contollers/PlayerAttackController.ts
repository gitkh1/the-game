import { Projectile } from '../model/Projectile';
import { T_GameModel, T_PlayerState } from '../types/game';
import { randFloat } from '../utils/random';

export class PlayerAttackController {
  constructor(readonly model: T_GameModel) {}

  tryDoAttack() {
    if (!this.isPlayerCanShoot()) return;
    this.useManaPoint();

    this.processAttack();
  }

  isPlayerCanShoot() {
    const { mana, hp } = this.model.player;
    const { cost } = this.model.projectileConfig;
    return hp > 0 && mana >= cost;
  }

  useManaPoint() {
    const { cost } = this.model.projectileConfig;
    const { isRoundMana, mana } = this.model.player;

    const newMana = mana - cost;
    const rounded = isRoundMana ? Math.floor(newMana / 10) * 10 : newMana;

    this.model.player.mana = Math.max(0, rounded);
  }

  processAttack() {
    this.model.player.setState(T_PlayerState.ATTACK);
    this.model.assets.audio.play('attack');

    const { x, y } = this.model.mouse;
    this.fireProjectileToPoint(x, y);
  }

  fireProjectileToPoint(targetX: number, targetY: number) {
    const { x, y } = this.getPlayerShotPos();

    const { velocity, spreading } = this.model.projectileConfig;
    let dx = targetX - x;
    let dy = targetY - y;

    let distanceToCursor = Math.hypot(dx, dy);
    dx /= distanceToCursor;
    dy /= distanceToCursor;

    const spread = spreading / 100;
    dx += randFloat(-spread, spread);
    dy += randFloat(-spread, spread);

    distanceToCursor = Math.hypot(dx, dy);
    dx /= distanceToCursor;
    dy /= distanceToCursor;

    dx *= velocity;
    dy *= velocity;

    this.model.projectiles.push(new Projectile({ x, y, dx, dy }));
  }

  getPlayerShotPos() {
    const { height: worldHeight, floorHeight } = this.model.world;
    const { x: playerX, width, height } = this.model.player;
    const x = playerX + width;
    const y = worldHeight - floorHeight - height * 0.75;
    return { x, y };
  }
}
