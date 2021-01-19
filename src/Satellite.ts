import { ICircumferenceMetadata } from "./Utils/getTwoCircumferencesInterceptions";

export type TGetMessageMetadata = () => ICircumferenceMetadata;

export interface ICoordinate {
  y: number;
  x: number;
}

export class Satellite {
  name: string = "";
  position: ICoordinate = { x: 0, y: 0 };

  message: string[] = [];
  messageDistance: number = 0;

  constructor(name: string, position: ICoordinate) {
    this.name = name;
    this.position = position;
  }

  public receiveMessage = (messageDistance: number, message: string[]) => {
    this.messageDistance = messageDistance;
    this.message = message;
  };

  public getMessageMetadata: TGetMessageMetadata = () => {
    if (!this.messageDistance) {
      throw "No message has been sent to this Satellite";
    }

    return {
      x: this.position.x,
      y: this.position.y,
      radius: this.messageDistance,
    };
  };

  public messageIsWithinDistance = (x: number, y: number) => {
    return (
      this.messageDistance ===
      Math.round(
        Math.sqrt((this.position.x - x) ** 2 + (this.position.y - y) ** 2)
      )
    );
  };
}
