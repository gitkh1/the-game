import { spriteScheme } from './sprites';
import { imageScheme } from './images';
import { audioScheme } from './sounds';
import { AudioResource, ImageResource, SpriteResource } from '../components/Resource';

export { spriteScheme, imageScheme, audioScheme };

export const assets = {
  sprites: new SpriteResource(spriteScheme),
  images: new ImageResource(imageScheme),
  audio: new AudioResource(audioScheme),
};
