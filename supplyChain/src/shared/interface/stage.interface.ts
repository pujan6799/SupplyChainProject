import { IPart } from "./car.interface";

export interface IStage {
  title: string;
  AVAILABLE_PARTS: IPart[],
  resultPart: IPart | null,
  totalTimeForStage: number
}