import { Resource } from './components/Resource';
import { GameController } from './GameController';
import { configureDefaultGameModel } from './GameModel';
import { GameView } from './GameView';
import { T_GameModel } from './types/game';
import rafLoop from './utils/rafLoop';

declare global {
  interface Window {
    model: T_GameModel;
  }
}

export function runGame(canvas: HTMLCanvasElement, endCallback: (score: { kills: number; level: number }) => unknown) {
  canvas.tabIndex = 1;

  const model = configureDefaultGameModel(canvas);
  window.model = model;
  model.events.on('the-end', endCallback);

  const controller = new GameController(model);
  const view = new GameView(model);

  const loop = rafLoop(() => {
    model.events.emit('update');
    model.events.emit('render');
  });

  view.renderLoader();

  let isDestroyed = false;
  const destroyAll = () => {
    controller.destroy();
    view.destroy();
    isDestroyed = true;
  };

  downloadAssets(model.assets).then(
    () => {
      if (!isDestroyed) {
        loop.start();
      }
    },
    (error) => {
      console.error(error);
      destroyAll();
    }
  );

  return destroyAll;
}

function downloadAssets(assets: Record<string, Resource<unknown, unknown, Record<string, unknown>>>) {
  const promises = Object.values(assets).map((asset) => asset.downloadAll());
  return Promise.all(promises);
}
