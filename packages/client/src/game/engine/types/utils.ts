/* eslint-disable @typescript-eslint/naming-convention */
export type T_ReadonlyDeep<T> = T extends Record<string, unknown> ? T_ReadonlyObjectDeep<T> : T;

export type T_ReadonlyObjectDeep<ObjectType extends object> = {
  readonly [KeyType in keyof ObjectType]: T_ReadonlyDeep<ObjectType[KeyType]>;
};
