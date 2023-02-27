/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { T_GameModel, T_GameState } from "../types/game";

export class InputController {
  constructor(readonly model: T_GameModel) {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  isRegistered = false;

  register() {
    if (this.isRegistered) return;
    this.isRegistered = true;

    this.model.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.model.canvas.addEventListener("mousedown", this.handleMouseClick);
  }

  unregister() {
    if (!this.isRegistered) return;
    this.isRegistered = false;

    this.model.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.model.canvas.removeEventListener("mousedown", this.handleMouseClick);
  }

  handleMouseMove(event: MouseEvent) {
    this.model.mouse = {
      x: event.offsetX,
      y: event.offsetY,
    };
  }

  handleMouseClick(event: MouseEvent) {
    this.handleMouseMove(event);

    switch (this.model.world.state) {
      case T_GameState.PLAY:
        this.model.events.emit("click:play");
        break;

      case T_GameState.LEVELING:
        this.model.events.emit("click:leveling");
        break;
    }
  }
}
