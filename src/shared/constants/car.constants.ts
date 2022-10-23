import { IEngine, IWheel } from './../interface/car.interface';
import { IFabric } from "../interface/car.interface";

export const FABRIC_TYPES: IFabric[] = [
  {
    name: 'LIGHT GRAY-MOONSTONE FABRIC',
    img: 'assets/stage3/LIGHT GRAY-MOONSTONE FABRIC.png'
  },
  {
    name: 'MACADAMIAMOCHA FABRIC',
    img: 'assets/stage3/MACADAMIAMOCHA FABRIC.png'
  },
  {
    name: 'BLACK FABRIC',
    img: 'assets/stage3/BLACK FABRIC.png'
  }
]

export const WHEEL_TYPES: IWheel[] = [
  {
    title: 'Alloy Wheels',
    manufacturer: 'ABC',
    warranty: '10 years',
    dimensions: '3 * 3',
    isAvailable: true
  },
  {
    title: 'Sports Wheels',
    manufacturer: 'DEF',
    warranty: '10 years',
    dimensions: '3 * 4',
    isAvailable: true
  },
  {
    title: 'Basic Wheels',
    manufacturer: 'XYZ',
    warranty: '10 years',
    dimensions: '3 * 5',
    isAvailable: true
  }
]

export const ENGINE_TYPES: IEngine[] = [
  {
    title: 'Engine 1',
    manufacturer: 'ABC',
    capacity: '10',
    warranty: '10 Years',
      isAvailable: true
  },
  {
    title: 'Engine 2',
    manufacturer: 'DEF',
    capacity: '10',
    warranty: '15 Years',
      isAvailable: true
  },
  {
    title: 'Engine 3',
    manufacturer: 'PQR',
    capacity: '10',
    warranty: '20 Years',
      isAvailable: true
  }
]