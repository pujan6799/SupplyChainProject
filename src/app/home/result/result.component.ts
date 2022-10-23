import { Component, Input, OnInit } from '@angular/core';
import { IConfiguration } from 'src/shared/interface/car.interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() selectedColor = '';
  @Input() configuration!: IConfiguration;
  panelOpenState = true;
  constructor() {}

  ngOnInit(): void {
    // this.configuration = {
    //   wheel: {
    //     title: 'Alloy Wheels',
    //     manufacturer: 'ABC',
    //     warranty: '10 years',
    //     dimensions: '3 * 3',
    //     isAvailable: true,
    //   },
    //   engine: {
    //     title: 'Engine 1',
    //     manufacturer: 'ABC',
    //     capacity: '10',
    //     warranty: '10 Years',
    //     isAvailable: true,
    //   },
    //   interior: {
    //     fabric: {
    //       name: 'MACADAMIAMOCHA FABRIC',
    //       img: 'assets/stage3/MACADAMIAMOCHA FABRIC.png',
    //     },
    //   },
    //   carImg: 'assets/stage4/pearlWhite.jpg',
    //   bolts: [
    //     {
    //       name: 'Wheels Studs',
    //       isAvailable: true,
    //       manufacturer: 'ABC Bolts',
    //       dimensions: '3 * 3',
    //     },
    //     {
    //       name: 'Engine Fasteners',
    //       isAvailable: true,
    //       manufacturer: 'DEF Bolts',
    //       dimensions: '3 * 3',
    //     },
    //     {
    //       name: 'Exterior Bolts',
    //       isAvailable: true,
    //       manufacturer: 'XYZ Bolts',
    //       dimensions: '3 * 3',
    //     },
    //   ],
    // };
    
    console.log(this.configuration);
  }
}
