import { AudioResource, ImageResource, SpriteResource } from "../components/Resource";

import { imageScheme } from "./images";
import { audioScheme } from "./sounds";
import { spriteScheme } from "./sprites";

export { audioScheme, imageScheme, spriteScheme };

export const assets = {
  sprites: new SpriteResource(spriteScheme),
  images: new ImageResource(imageScheme),
  audio: new AudioResource(audioScheme),
};
