import { ICoordinate } from "../Satellite";

export interface ICircumferenceMetadata extends ICoordinate {
  radius: number;
}

type IGetTwoCircumferencesInterceptions = (
  c1: ICircumferenceMetadata,
  c2: ICircumferenceMetadata
) => ICoordinate[];

export const getTwoCircumferencesInterceptions: IGetTwoCircumferencesInterceptions = (
  c1,
  c2
) => {
  const { x: x1, y: y1, radius: r1 } = c1;
  const { x: x2, y: y2, radius: r2 } = c2;

  // Taken from: https://math.stackexchange.com/a/1033561
  const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  const l = (r1 ** 2 - r2 ** 2 + d ** 2) / (2 * d);
  const h = Math.sqrt(r1 ** 2 - l ** 2);

  const xi1 = (l / d) * (x2 - x1) + (h / d) * (y2 - y1) + x1;
  const xi2 = (l / d) * (x2 - x1) - (h / d) * (y2 - y1) + x1;
  const yi1 = (l / d) * (y2 - y1) + (h / d) * (x2 - x1) + y1;
  const yi2 = (l / d) * (y2 - y1) - (h / d) * (x2 - x1) + y1;

  return [
    { x: xi1, y: yi1 },
    { x: xi2, y: yi2 },
  ];
};
