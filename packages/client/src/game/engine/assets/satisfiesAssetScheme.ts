import { T_AssetScheme } from '../types/assetScheme';

export const satisfiesAssetScheme = <T extends T_AssetScheme>(o: T extends T_AssetScheme ? T : never) => o;
