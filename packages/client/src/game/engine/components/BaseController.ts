import { T_GameModel } from '../types/game';

export abstract class BaseController {
  constructor(protected readonly model: T_GameModel) {
    this.init();
  }

  abstract init(): void;
}
