import { ENGINE_TYPES, FABRIC_TYPES, WHEEL_TYPES } from './car.constants';
import { IStage } from '../interface/stage.interface';
import {
  WHEEL_STUDS,
  ENGINE_FASTENERS,
  EXTERIOR_BOLTS,
} from './bolt.constants';
import {
  AXLE,
  AXLE_WITH_TIRES,
  BOLTS,
  CAR_AXLE_WITHOUT_TIRE,
  CAR_ENGINE,
  EXTERIOR,
  FIBER_BODY,
  FIBER_BODY_WITH_ENGINE,
  FIBER_WITH_TIRES,
  INTERIOR,
  RESULT_OF_EXTERIOR,
  RESULT_OF_INTERIOR,
  WHEELS,
} from './parts.constants';

export const STAGE1: IStage = {
  title: 'Foundation',
  AVAILABLE_PARTS: [
    {
      ...AXLE,
      resultPart: CAR_AXLE_WITHOUT_TIRE,
    },
    {
      ...WHEELS,
      resultPart: CAR_AXLE_WITHOUT_TIRE,
      showWheelTypes: true,
      wheelTypes: WHEEL_TYPES,
    },
    {
      ...BOLTS,
      resultPart: AXLE_WITH_TIRES,
      boltTypes: [
        {
          ...WHEEL_STUDS,
          isAvailable: true,
        },
        ENGINE_FASTENERS,
        EXTERIOR_BOLTS,
      ],
    },
  ],
  resultPart: null,
  totalTimeForStage: 0,
};

export const STAGE2: IStage = {
  title: 'Engine Customization',
  AVAILABLE_PARTS: [
    {
      ...FIBER_BODY,
      resultPart: FIBER_WITH_TIRES,
    },
    {
      ...CAR_ENGINE,
      resultPart: FIBER_WITH_TIRES,
      showEngineTypes: true,
      engineTypes: ENGINE_TYPES,
    },
    {
      ...BOLTS,
      resultPart: FIBER_BODY_WITH_ENGINE,
      boltTypes: [
        WHEEL_STUDS,
        {
          ...ENGINE_FASTENERS,
          isAvailable: true,
        },
        EXTERIOR_BOLTS,
      ],
    },
  ],
  resultPart: null,
  totalTimeForStage: 0,
};

export const STAGE3: IStage = {
  title: 'Interior & Exterior',
  AVAILABLE_PARTS: [
    {
      ...INTERIOR,
      resultPart: RESULT_OF_INTERIOR,
      showFabricType: true,
      fabricTypes: FABRIC_TYPES,
    },
    {
      ...EXTERIOR,
      resultPart: RESULT_OF_EXTERIOR,
      boltTypes: [
        WHEEL_STUDS,
        ENGINE_FASTENERS,
        {
          ...EXTERIOR_BOLTS,
          isAvailable: true,
        },
      ],
    },
  ],
  resultPart: null,
  totalTimeForStage: 0,
};
