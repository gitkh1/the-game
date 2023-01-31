import { T_GameModelReadOnly } from "../types/game";

export abstract class BaseView {
  protected ctx: CanvasRenderingContext2D;

  constructor(protected model: T_GameModelReadOnly) {
    this.ctx = model.context;
    this.init();
  }

  abstract init(): void;

  protected rect(color: string | CanvasGradient, x: number, y: number, width: number, height: number) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  protected circle(color: string | CanvasGradient, x: number, y: number, radius: number) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  protected text(color: string, str: string, font: string, x: number, y: number) {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.textBaseline = "top";
    this.ctx.fillText(str, x, y);
  }

  protected rotateCanvas(x: number, y: number, angle: number) {
    const transform = this.ctx.getTransform();
    this.ctx.translate(x, y);
    this.ctx.rotate((angle * Math.PI) / 180);

    return () => {
      this.ctx.setTransform(transform);
    };
  }

  protected withRotation(x: number, y: number, angle: number, callback: () => void) {
    const reverRotate = this.rotateCanvas(x, y, angle);
    callback();
    reverRotate();
  }

  protected setCursor(type: "pointer" | "") {
    this.model.canvas.style.cursor = type;
  }
}
