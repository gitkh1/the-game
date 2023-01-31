import { spriteScheme } from './assets';
import { BaseView } from './components/BaseView';
import { Enemy } from './model/Enemy';
import { E_EnemyState, T_GameState, T_PlayerState } from './types/game';
import { SimpleMenuView } from './view/SimpleMenuView';

export class GameView extends BaseView {
  menu = new SimpleMenuView(this.model);

  init() {
    this.onFrameUpdate = this.onFrameUpdate.bind(this);
    this.model.events.on('render', this.onFrameUpdate);
  }

  destroy() {
    return;
  }

  onFrameUpdate() {
    this.renderBackround();
    this.renderEnemies();
    this.renderProjectileTrails();
    this.renderProjectiles();
    this.renderPlayer();

    this.renderFloor();
    this.renderGui();

    this.showBlackScreenAtStartAndEnd();
  }

  renderBackround() {
    const { width, height } = this.model.world;
    this.ctx.drawImage(this.model.assets.images.get('background'), 0, 0, width, height);
  }

  renderPlayer() {
    const { height: worldHeight, floorHeight } = this.model.world;
    const { state, x, width, height, animationFrame } = this.model.player;
    const { sprites } = this.model.assets;

    const y = worldHeight - floorHeight - height;
    const flipped = this.model.mouse.x < x + width / 2;

    let sprite;
    switch (state) {
      case T_PlayerState.IDLE:
        sprite = sprites.get('playerIdle');
        break;

      case T_PlayerState.ATTACK:
        sprite = sprites.get('playerAttack');
        break;

      case T_PlayerState.DEAD:
        sprite = sprites.get('playerDead');
        break;

      default:
        return;
    }

    sprite.draw(this.ctx, animationFrame, x, y, width, height, { flipped });
  }

  renderProjectiles() {
    const { radius, color } = this.model.projectileConfig;
    const projectiles = this.model.projectiles;

    projectiles.forEach((p) => {
      this.circle(color, p.x, p.y, radius);
    });
  }

  renderProjectileTrails() {
    const { radius } = this.model.projectileConfig;
    const { maxAge } = this.model.projectileTrailConfig;
    const trails = this.model.projectileTrails;

    trails.forEach((p) => {
      this.circle(p.color, p.x, p.y, ((maxAge - p.age) / maxAge) * radius);
    });
  }

  renderEnemies() {
    const { width, height } = this.model.enemyConfig;

    this.model.enemies.forEach((enemy) => {
      const { x, y, animationFrame } = enemy;
      const sprite = this.model.assets.sprites.get(this.getEnemySpriteByState(enemy));
      sprite.draw(this.ctx, animationFrame, x, y, width, height, { flipped: true });
    });
  }

  getEnemySpriteByState(enemy: Enemy): keyof typeof spriteScheme {
    switch (enemy.state) {
      case E_EnemyState.WALK:
        return enemy.isJumpingType ? `${enemy.type}Jump` : `${enemy.type}Walk`;

      case E_EnemyState.ATTACK:
        return `${enemy.type}Attack`;

      case E_EnemyState.DEAD:
        return `${enemy.type}Dead`;
    }
    throw new Error('Not found animation for enemy state');
  }

  renderFloor() {
    const { height, floorHeight } = this.model.world;
    this.ctx.drawImage(this.model.assets.images.get('floor'), 0, height - floorHeight);
  }

  renderHpManaDots(x: number, y: number, name: keyof typeof spriteScheme, value: number, maxValue: number, base: number) {
    value = Math.floor(value / base);
    maxValue = this.getMaxBarValueForAnimation(Math.floor(maxValue / base));

    const sprite = this.model.assets.sprites.get(name);
    for (let i = 0; i < maxValue; i++) {
      const offset = x + i * (24 + 2);
      const frameNum = i < value ? 0 : 1;

      sprite.draw(this.ctx, frameNum, offset, y, 24, 24);
    }
  }

  getMaxBarValueForAnimation(maxValue: number) {
    const { state, levelAnimationFrames } = this.model.world;

    if (this.model.player.level === 0 && state === T_GameState.PLAY) {
      return Math.min(levelAnimationFrames / 10 - 10, maxValue);
    }
    return maxValue;
  }

  showBlackScreenAtStartAndEnd() {
    const { levelAnimationFrames, state, width, height } = this.model.world;
    const { kills, state: playerState, animationFrame } = this.model.player;

    const isAtStart = kills === 0 && state === T_GameState.PLAY;
    if (isAtStart) {
      const alpha = ((100 - levelAnimationFrames) / 100) * 100;
      if (alpha < 0) return;

      this.rect(`hsl(0 0% 0% / ${alpha}%)`, 0, 0, width, height);
      return;
    }
    if (playerState === T_PlayerState.DEAD) {
      const alpha = (animationFrame / 20) * 100;
      if (alpha < 0) return;

      this.rect(`hsl(0 0% 0% / ${alpha}%)`, 0, 0, width, height);
    }
  }

  setCursor(type: 'pointer' | '') {
    this.model.canvas.style.cursor = type;
  }

  renderPlayerScore() {
    const { width, levelAnimationFrames, state } = this.model.world;
    const { kills, level } = this.model.player;
    const template = `Kills ${kills}   LVL ${level}`;

    const isAtStart = kills === 0 && state === T_GameState.PLAY;
    const alpha = isAtStart ? Math.min(levelAnimationFrames / 5 - 30, 100) : 100;

    this.ctx.textAlign = 'right';
    this.text(`hsl(0 100% 100% / ${alpha}%)`, template, '24px Impact', width - 30, 30);
  }

  renderGui() {
    const { hp, mana, maxHp, maxMana } = this.model.player;

    this.renderHpManaDots(30, 20, 'hp', hp, maxHp, 1);
    this.renderHpManaDots(30, 50, 'mana', mana, maxMana, 10);
    this.renderPlayerScore();

    this.setCursor('');
    if (this.model.world.state === T_GameState.LEVELING) {
      this.menu.renderMenu(this.model.gui.leveling);
    }
  }
}
