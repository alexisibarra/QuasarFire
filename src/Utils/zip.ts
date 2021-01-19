// taken from https://gist.github.com/renaudtertrais/25fc5a2e64fe5d0e86894094c6989e10

type TZip = <T>(arr: T[], ...arrs: T[][]) => T[][];

export const zip: TZip = (arr, ...arrs) =>
  arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
