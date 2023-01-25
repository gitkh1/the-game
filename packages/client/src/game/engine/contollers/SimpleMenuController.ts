import { T_GameModel } from '../types/game';
import { T_SimpleMenu } from '../types/gui';

export class SimpleMenuController {
  constructor(readonly model: T_GameModel) {}

  updateMenuItemsEffects(menu: T_SimpleMenu) {
    menu.items.forEach((item) => {
      item.isHover = false;
    });

    const { x, y } = this.model.mouse;
    const menuItem = this.getMenuItemUnderPoint(menu, x, y);
    if (menuItem?.enabled) {
      menuItem.isHover = true;
    }
  }

  tryHandleClickOnSimpleMenu(menu: T_SimpleMenu) {
    if (this.shoudThrottleFastClick()) {
      return;
    }

    const { x, y } = this.model.mouse;
    const menuItem = this.getMenuItemUnderPoint(menu, x, y);
    if (menuItem?.enabled) {
      this.model.events.emit(menu.clickEvent, menuItem);
    }
  }

  shoudThrottleFastClick() {
    return this.model.world.levelAnimationFrames < 20;
  }

  getMenuItemUnderPoint(menu: T_SimpleMenu, _x: number, y: number) {
    const { fontSize, gap, offsetTop, items } = menu;

    if (y < offsetTop) return null;
    const index = Math.floor((y - offsetTop) / (fontSize + gap));
    if (index >= items.length) return null;

    const isGap = y - offsetTop - index * (fontSize + gap) > fontSize;
    if (isGap) return null;

    return items[index];
  }
}
