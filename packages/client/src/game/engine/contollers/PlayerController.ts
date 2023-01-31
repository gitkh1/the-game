import { T_GameModel, T_GameState, T_PlayerState } from "../types/game";

export class PlayerController {
  constructor(readonly model: T_GameModel) {}

  processPlayer() {
    this.incrementAnimationFrame();

    switch (this.model.player.state) {
      case T_PlayerState.ATTACK:
        this.processAttackState();
        break;

      case T_PlayerState.IDLE:
        this.processIdleState();
        break;

      case T_PlayerState.DEAD:
        this.processDeadState();
        break;
    }
  }

  incrementAnimationFrame() {
    this.model.player.animationFrame += 1;
  }

  processAttackState() {
    this.setDeadIfZeroHp();
    this.setIdleAfterAttack();
    this.increaseMana();
  }

  processIdleState() {
    this.setDeadIfZeroHp();
    this.increaseMana();
  }

  processDeadState() {
    const { animationFrame } = this.model.player;
    switch (animationFrame) {
      case 1:
        this.model.assets.audio.play("encounter");
        break;
      case 45:
        this.model.world.setState(T_GameState.END);
        break;
    }
  }

  setDeadIfZeroHp() {
    const player = this.model.player;

    if (player.hp <= 0) {
      this.model.player.setState(T_PlayerState.DEAD);
    }
  }

  setIdleAfterAttack() {
    const { animationFrame } = this.model.player;
    const { frames, frameDelay = 1 } = this.model.assets.sprites.getScheme("playerAttack");

    const animationLength = frames * frameDelay;
    if (animationFrame >= animationLength) {
      this.model.player.setState(T_PlayerState.IDLE);
    }
  }

  increaseMana() {
    const { deltaTime: dt } = this.model.world;
    const { mana, maxMana, manaPerSecond } = this.model.player;

    this.model.player.mana = Math.min(maxMana, mana + manaPerSecond * dt);
  }
}
