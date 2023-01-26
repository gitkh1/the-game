import { CollisionController } from './contollers/CollisionController';
import { EnemyController } from './contollers/EnemyController';
import { InputController } from './contollers/InputController';
import { PlayerAttackController } from './contollers/PlayerAttackController';
import { PlayerController } from './contollers/PlayerController';
import { ProjectileController } from './contollers/ProjectileController';
import { ProjectileTrailController } from './contollers/ProjectileTrailController';
import { SimpleMenuController } from './contollers/SimpleMenuController';
import { BaseController } from './components/BaseController';
import { T_EffectPoints, E_EnemyState, T_GameState } from './types/game';
import { T_SimpleMenuItem } from './types/gui';
import { randChoice } from './utils/random';
import { Enemy } from './model/Enemy';
import { Projectile } from './model/Projectile';

export class GameController extends BaseController {
  attack = new PlayerAttackController(this.model);
  enemies = new EnemyController(this.model);
  player = new PlayerController(this.model);
  projectiles = new ProjectileController(this.model);
  trails = new ProjectileTrailController(this.model);
  collision = new CollisionController(this.model);
  input!: InputController;

  init() {
    this.onTickUpdate = this.onTickUpdate.bind(this);
    this.model.events.on('update', this.onTickUpdate);

    this.onEnemyCollidesWithProjectile = this.onEnemyCollidesWithProjectile.bind(this);

    this.input = new InputController(this.model);
    this.input.register();

    this.model.events.on('click:leveling', () => {
      this.menu.tryHandleClickOnSimpleMenu(this.model.gui.leveling);
    });

    this.model.events.on('click:play', () => {
      this.attack.tryDoAttack();
    });

    this.model.events.on('gui:leveling', (menuItem?: T_SimpleMenuItem) => {
      this.handleClickInLevelingMenu(menuItem);
    });
  }

  destroy() {
    this.input?.unregister();
    this.model.events.offAll();
  }

  menu = new SimpleMenuController(this.model);

  onTickUpdate() {
    this.model.world.levelAnimationFrames += 1;

    switch (this.model.world.state) {
      case T_GameState.PLAY:
        this.processPlayState();
        break;
      case T_GameState.LEVELING:
        this.processLevelingState();
        break;
      case T_GameState.END:
        this.emitEndEventIfNeed();
        break;
    }
  }
  emitEndEventIfNeed() {
    const { levelAnimationFrames } = this.model.world;

    if (levelAnimationFrames === 20) {
      const { kills, level } = this.model.player;
      this.model.events.emit('the-end', { kills, level });
    }
  }

  processPlayState() {
    this.collision.processForAllEnemiesAndProjectile(this.onEnemyCollidesWithProjectile);

    this.enemies.processAllEnemies();
    this.player.processPlayer();
    this.projectiles.processAllProjectiles();
    this.trails.processAllTrails();
  }

  processLevelingState() {
    this.menu.updateMenuItemsEffects(this.model.gui.leveling);
    this.calculateAbillityPointsInMenu();
  }

  onEnemyCollidesWithProjectile(enemy: Enemy, projectile: Projectile) {
    projectile.x = -1e9;
    enemy.setState(E_EnemyState.DEAD);

    this.model.assets.audio.play('hit');

    this.model.player.kills += 1;
    this.tryLevelUp();
  }

  calculateAbillityPointsInMenu() {
    const { positive: effects } = this.model.effects;
    const { items } = this.model.gui.leveling;
    items.forEach((item) => {
      const points = effects[item.tag as keyof typeof effects];
      item.textRight = String(points);
      item.enabled = points < 10;
    });
  }

  tryLevelUp() {
    const { positive: positiveEffects, max: maxPoints } = this.model.effects;
    const { player, world } = this.model;

    const level = Math.floor(player.kills / world.killsForLevel);
    if (player.hp <= 0 || player.level === level) return;

    this.tryIncreaseNegativeEffect();

    player.level = level;

    const maxLevel = Object.keys(positiveEffects).length * maxPoints;
    if (level < maxLevel) {
      this.model.assets.audio.play('levelUp');
      this.model.world.setState(T_GameState.LEVELING);
    }
  }

  tryIncreaseNegativeEffect() {
    const { negative: negativeEffects, max: maxPoints } = this.model.effects;

    let posibleEffects = Object.entries(negativeEffects).filter(([, points]) => {
      return points < maxPoints;
    });
    if (posibleEffects.length === 0) return;

    if (negativeEffects.jumpChance === 0) {
      posibleEffects = posibleEffects.filter(([name]) => !name.includes('jump') || name === 'jumpChance');
    }

    const [effectName] = randChoice(posibleEffects) as [keyof typeof negativeEffects, number];
    negativeEffects[effectName] += 1;
    this.applyNegativeEffect(effectName);
  }

  applyNegativeEffect(name: keyof T_EffectPoints['negative']) {
    const enemyConfig = this.model.enemyConfig;
    switch (name) {
      case 'jumpChance':
        enemyConfig.jumpedEnemyChance += 3;
        break;
      case 'jumpHeight':
        enemyConfig.jumpHeight += 15;
        break;
      case 'jumpLength':
        enemyConfig.jumpLength += 15;
        break;
      case 'walkSpeed':
        enemyConfig.speed += 12;
        break;
      case 'spawnDelay':
        enemyConfig.spawnDelay[0] -= 40;
        enemyConfig.spawnDelay[1] -= 150;
        break;
    }
  }

  handleClickInLevelingMenu(menuItem?: T_SimpleMenuItem) {
    if (!menuItem) return;

    const { positive: effects } = this.model.effects;
    const effectName = menuItem.tag as keyof typeof effects;
    effects[effectName] += 1;
    this.applyPositiveEffect(effectName);
    this.model.world.setState(T_GameState.PLAY);
    this.model.assets.audio.play('uiConfirm');
  }

  applyPositiveEffect(name: keyof T_EffectPoints['positive']) {
    const player = this.model.player;
    switch (name) {
      case 'accuracy':
        this.model.projectileConfig.spreading -= 2;
        break;
      case 'hp':
        player.maxHp += 1;
        player.hp += 1;
        break;
      case 'mana':
        player.maxMana += 10;
        break;
      case 'manaRegen':
        player.manaPerSecond += 1;
        break;
      case 'projectileSize':
        this.model.projectileConfig.radius += 0.5;
        break;
    }
  }
}
