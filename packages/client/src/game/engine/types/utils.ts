export type ReadonlyDeep<T> = T extends Record<string, unknown> ? ReadonlyObjectDeep<T> : T;

export type ReadonlyObjectDeep<ObjectType extends object> = {
  readonly [KeyType in keyof ObjectType]: ReadonlyDeep<ObjectType[KeyType]>;
};
