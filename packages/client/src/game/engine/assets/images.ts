import { satisfiesAssetScheme } from './satisfiesAssetScheme';

const pathes = import.meta.glob('./images/*.png', { as: 'url', eager: true });

export const imageScheme = satisfiesAssetScheme({
  background: pathes['./images/background.png'],
  floor: pathes['./images/floor.png'],
});
