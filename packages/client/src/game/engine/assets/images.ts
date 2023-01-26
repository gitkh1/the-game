import { T_AssetScheme } from '../types/assetScheme';
import { satisfies } from '../utils/satisfies';

const pathes = import.meta.glob('./images/*.png', { as: 'url', eager: true });

export const imageScheme = satisfies<T_AssetScheme>()({
  background: pathes['./images/background.png'],
  floor: pathes['./images/floor.png'],
});
