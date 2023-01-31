import { Resource } from './components/Resource';
import { GameController } from './GameController';
import { configureDefaultGameModel } from './GameModel';
import { GameView } from './GameView';
import { T_GameModel, T_GameState, T_Score } from './types/game';
import rafLoop from './utils/rafLoop';

declare global {
  interface Window {
    model: T_GameModel;
  }
}

export class GameRunner {
  protected model?: T_GameModel;
  protected controller?: GameController;
  protected view?: GameView;

  setup(canvas: HTMLCanvasElement) {
    const model = configureDefaultGameModel(canvas);
    this.model = model;
    this.controller = new GameController(model);
    this.view = new GameView(model);

    window.model = this.model;
  }

  getScore(): T_Score {
    if (!this.model) throw new Error('GameRunner not yet setuped');
    const { kills, level } = this.model.player;
    return { kills, level };
  }

  onStateChanged(callback: (state: T_GameState) => unknown) {
    if (!this.model) throw new Error('GameRunner not yet setuped');
    this.model.events.on('world:state', callback);
  }

  isReady = false;
  error?: Error;
  async loadResources() {
    if (!this.model) throw new Error('GameRunner not yet setuped');
    if (this.isReady) return;

    try {
      await downloadAssets(this.model.assets);
      this.isReady = true;
    } catch (error) {
      console.error(error);
      this.error = new Error('Что-то пошло не так при загрузке ресурсов..', { cause: error });
    }
  }
  protected gameLoop = rafLoop(() => {
    this.model?.events.emit('update');
    this.model?.events.emit('render');
  });

  get isRunning() {
    return this.gameLoop.isRunning;
  }

  start() {
    if (this.model && this.isReady) {
      this.gameLoop.start();
    }
  }

  stop() {
    this.gameLoop.stop();
  }

  destroy() {
    this.stop();
    this.controller?.destroy();
    this.view?.destroy();
    this.model?.events.offAll();
    this.model = undefined;
    this.controller = undefined;
    this.view = undefined;
    this.isReady = false;
  }
}

function downloadAssets(assets: Record<string, Resource>) {
  const promises = Object.values(assets).map((asset) => asset.downloadAll());
  return Promise.all(promises);
}
