/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BaseView } from "../components/BaseView";
import { T_SimpleMenu } from "../types/gui";

export class SimpleMenuView extends BaseView {
  init() {
    return;
  }

  renderMenu(menu: T_SimpleMenu) {
    const { width } = this.model.world;
    const { fontSize, gap, header, items, offsetTop } = menu;
    const x = width / 2;

    this.renderFullBlackBackground();

    this.renderMenuHeader(header, fontSize * 1.5, x, 100 - fontSize);

    this.setCursor("");

    const font = `${fontSize}px Sans-Serif`;
    items.forEach(({ enabled, isHover, textLeft, textRight }, index) => {
      const offset = offsetTop + index * (fontSize + gap);
      let color;
      if (enabled) {
        color = isHover ? "lightgreen" : "white";
      } else {
        color = "gray";
      }

      if (isHover) this.setCursor("pointer");

      this.renderMenuItemLeft(color, textLeft, font, x - 10, offset);
      this.renderMenuItemRight(color, textRight, font, x + 10, offset);

      if (enabled) {
        this.text("green", "+", font, x + 35, offset);
      }
    });
  }

  renderFullBlackBackground() {
    const { width, height } = this.model.world;
    this.rect("hsl(0 100% 0% / 70%)", 0, 0, width, height);
  }

  renderMenuHeader(text: string, fontSize: number, x: number, y: number) {
    this.ctx.textAlign = "center";
    this.text("white", text, `${fontSize}px Sans-Serif`, x, y);
  }

  renderMenuItemLeft(color: string, text: string, font: string, x: number, y: number) {
    this.ctx.textAlign = "right";
    this.text(color, text, font, x, y);
  }

  renderMenuItemRight(color: string, text: string, font: string, x: number, y: number) {
    this.ctx.textAlign = "left";
    this.text(color, text, font, x, y);
  }
}
