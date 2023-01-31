/* eslint-disable indent */
/* eslint-disable @typescript-eslint/naming-convention */
export const satisfies =
  <ReferenceType>() =>
  <T extends ReferenceType>(o: T extends ReferenceType ? T : never) =>
    o;
