export type T_SpriteProps = {
  url: string;
  frames: number;
  frameDelay?: number;
  hitboxX?: number;
  hitboxY?: number;
  hitboxW?: number;
  hitboxH?: number;
  isVertical?: boolean;
  isLooped?: boolean;
};

type T_SpriteConfig = Omit<Required<T_SpriteProps>, "url"> & {
  image: HTMLImageElement;
};

type T_FrameConfig = Partial<{
  isFlipped: boolean;
  cropTop: number;
  cropLeft: number;
  cropRight: number;
  cropBottom: number;
}>;

export class Sprite {
  isLoaded = false;
  loader: Promise<unknown>;
  private config: T_SpriteConfig;

  constructor(props: T_SpriteProps) {
    const image = new Image();
    image.src = props.url;
    this.loader = new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    }).then(() => {
      this.isLoaded = true;
      this.recalculateHitboxIfNeed();
    });

    this.config = {
      hitboxX: 0,
      hitboxY: 0,
      hitboxW: 0,
      hitboxH: 0,
      frameDelay: 1,
      isVertical: false,
      isLooped: true,
      ...props,
      image,
    };
  }

  private recalculateHitboxIfNeed() {
    const cfg = this.config;
    if (!cfg.hitboxW) {
      cfg.hitboxW = cfg.image.width - cfg.hitboxX;
      if (!cfg.isVertical) cfg.hitboxW /= cfg.frames;
    }
    if (!cfg.hitboxH) {
      cfg.hitboxH = cfg.image.height - cfg.hitboxY;
      if (cfg.isVertical) cfg.hitboxH /= cfg.frames;
    }
  }

  draw(ctx: CanvasRenderingContext2D, framesElapsed: number, x: number, y: number, width: number, height: number, frameConfig: T_FrameConfig = {}) {
    if (!this.isLoaded) return;
    if (frameConfig.isFlipped) {
      frameConfig.isFlipped = false;
      ctx.scale(-1, 1);
      this.draw(ctx, framesElapsed, -x - width, y, width, height, frameConfig);
      ctx.scale(-1, 1);
      return;
    }

    const { frameDelay: delay, frames, image, isVertical, hitboxX, hitboxY, hitboxW, hitboxH, isLooped } = this.config;
    let frameIndex = Math.floor(framesElapsed / delay);
    frameIndex = isLooped ? frameIndex % frames : Math.min(frameIndex, frames - 1);

    // Определяем нужное положение кадра анимации
    let frameWidth = isVertical ? image.width : image.width / frames;
    let frameHeight = !isVertical ? image.height : image.height / frames;
    let frameX = isVertical ? 0 : frameIndex * frameWidth;
    let frameY = !isVertical ? 0 : frameIndex * frameHeight;

    // Обрезаем лишнее со стороны
    const { cropBottom = 0, cropLeft = 0, cropRight = 0, cropTop = 0 } = frameConfig;
    frameX += cropLeft;
    frameY += cropTop;
    frameWidth -= cropLeft + cropRight;
    frameHeight -= cropTop + cropBottom;

    // Совмещаем с хитбоксом
    const scaleX = width / hitboxW;
    const scaleY = height / hitboxH;
    const SpriteX = x - hitboxX * scaleX;
    const SpriteY = y - hitboxY * scaleY;
    const SpriteWidth = frameWidth * scaleX;
    const SpriteHeight = frameHeight * scaleY;

    ctx.drawImage(image, frameX, frameY, frameWidth, frameHeight, SpriteX, SpriteY, SpriteWidth, SpriteHeight);

    window.model.debug &&
      queueMicrotask(() => {
        ctx.strokeStyle = "cyan";
        ctx.strokeRect(Math.max(SpriteX, -SpriteX - SpriteWidth), SpriteY, SpriteWidth, SpriteHeight);
        ctx.strokeStyle = "red";
        ctx.strokeRect(Math.max(x, -x - width), y, width, height);
      });
  }
}
