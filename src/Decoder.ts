import { getCombinations } from "./Utils/getCombinations";
import { getTwoCircumferencesInterceptions } from "./Utils/getTwoCircumferencesInterceptions";
import { Satellite } from "./Satellite";
import { zip } from "./Utils/zip";

export class Decoder {
  satellites: Satellite[] = [];

  constructor(satellites: Satellite[]) {
    this.satellites = satellites;
  }

  public getLocation = () => {
    const satellitesCombinations = getCombinations(this.satellites);

    const intersections = satellitesCombinations.flatMap((combination) => {
      const [satelliteA, satelliteB] = combination;

      return getTwoCircumferencesInterceptions(
        satelliteA.getMessageMetadata(),
        satelliteB.getMessageMetadata()
      );
    });

    return intersections.find((intersection) =>
      this.satellites.every((satellite) =>
        satellite.messageIsWithinDistance(intersection.x, intersection.y)
      )
    );
  };

  public getMessage = () => {
    const receivedMessages = this.satellites.map(
      (satellite) => satellite.message
    );

    const zippedMessages = zip<string>(
      new Array(receivedMessages[0].length).fill(""),
      ...receivedMessages
    );

    return zippedMessages
      .map((messageWordArray) => {
        // messageWordArray contains what all satellites received for a given word of the message
        // We want the first of those that are not empty
        const validMessageWords = messageWordArray.filter(Boolean);

        return validMessageWords[0];
      })
      .join(" ");
  };
}
