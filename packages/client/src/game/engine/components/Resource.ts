import { ReadonlyDeep } from '../types/utils';
import { Sprite, T_SpriteProps } from './Sprite';

export abstract class Resource<
  SchemeValue = unknown,
  ResourceClass = unknown,
  Scheme extends Record<string, SchemeValue> = Record<string, SchemeValue>
> {
  constructor(protected scheme: Scheme) {
    this.length = Object.keys(scheme).length;
  }
  readonly length: number;
  isLoaded = false;
  error?: Error;

  protected data = {} as Record<keyof Scheme, ResourceClass>;

  get(key: keyof Scheme): ResourceClass {
    if (!this.isLoaded) throw new Error('trying get not loaded resource');
    return this.data[key];
  }

  getScheme(key: keyof Scheme) {
    return this.scheme[key] as ReadonlyDeep<SchemeValue>;
  }

  protected promises: Promise<unknown>[] = [];

  protected abstract downloadOne(name: string, value: SchemeValue): ResourceClass;

  async downloadAll() {
    if (this.length === 0) return;
    if (this.promises.length > 0) return Promise.all(this.promises);

    Object.entries(this.scheme).forEach(([key, value]) => {
      this.data[key as keyof Scheme] = this.downloadOne(key, value);
    });

    try {
      await Promise.all(this.promises);
      this.isLoaded = true;
    } catch (error) {
      this.error = error as Error;
      throw error;
    }
  }
}

export class AudioResource<Scheme extends Record<string, string>> extends Resource<string, HTMLAudioElement, Scheme> {
  play(name: keyof Scheme) {
    let audio = this.get(name);
    if (!audio.paused) {
      audio = audio.cloneNode() as HTMLAudioElement;
    }
    audio.play();
  }

  protected downloadOne(name: string, value: string): HTMLAudioElement {
    const audio = new Audio(value);

    this.promises.push(
      new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => reject(new Error(`Can't load sound resource '${name}' from '${value}'`));
      })
    );
    return audio;
  }
}

export class ImageResource<Scheme extends Record<string, string>> extends Resource<string, HTMLImageElement, Scheme> {
  protected downloadOne(name: string, value: string): HTMLImageElement {
    const image = new Image();
    image.src = value;

    this.promises.push(
      new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Can't load image resource '${name}' from '${value}'`));
      })
    );
    return image;
  }
}

export class SpriteResource<Scheme extends Record<string, T_SpriteProps>> extends Resource<T_SpriteProps, Sprite, Scheme> {
  protected downloadOne(name: string, value: T_SpriteProps): Sprite {
    const sprite = new Sprite(value);

    this.promises.push(
      sprite.loader.catch((error) => {
        throw new Error(`Can't load sprite resource '${name}' from '${value.url}'`, { cause: error });
      })
    );
    return sprite;
  }
}
