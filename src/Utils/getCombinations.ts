// Taken from https://stackoverflow.com/a/43241287

type TGetCombinations = <T>(array: T[]) => [T, T][];

export const getCombinations: TGetCombinations = <T>(array: T[]) =>
  array.flatMap((v, i) => array.slice(i + 1).map((w) => [v, w] as [T, T]));
