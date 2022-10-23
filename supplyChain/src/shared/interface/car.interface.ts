export interface IFabric {
  name: string;
  img: string;
}

export interface IWheel {
  title: string;
  manufacturer: string;
  dimensions: string;
  warranty: string;
  isAvailable: boolean;
}

export interface IPart {
  title: string;
  img: string;
  timeRequired: number;
  resultPart: IPart | null;
  boltTypes: IBolt[];
  showFabricType?: boolean;
  showWheelTypes?: boolean;
  showEngineTypes?: boolean;
  wheelTypes?: IWheel[]
  engineTypes?: IEngine[],
  fabricTypes?: IFabric[]
}

export interface IBolt {
  name: string;
  isAvailable: boolean;
  manufacturer: string;
  dimensions: string;
}

export interface IEngine {
    title: string;
    manufacturer: string;
    capacity: string;
    warranty: string;
    isAvailable: boolean;
}

export interface IInterior {
    fabric: IFabric
}

export interface IFabric {
    name: string;
    img: string;
}

export interface IConfiguration {
  wheel: IWheel;
  engine: IEngine;
  interior: IInterior;
  carImg: string;
  bolts: IBolt[]
}



