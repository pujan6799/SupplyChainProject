import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { IPart } from 'src/shared/interface/part.interface';

@Component({
  selector: 'app-stage3',
  templateUrl: './stage3.component.html',
  styleUrls: ['./stage3.component.scss']
})
export class Stage3Component implements OnInit {

  AVAILABLE_PARTS: IPart[] = [
    {
      name: 'fiberBodyAndEngine',
      imgSrc: 'assets/stage3/fiber body and engine.jpg'
    },
    {
      name: 'fiberBody',
      imgSrc: 'assets/stage3/Fiber body.jpg'
    },
    {
      name: 'bolts',
      imgSrc: 'assets/stage3/bolts.jpg'
    },
    {
      name: 'engine',
      imgSrc: 'assets/stage3/Car Engine.jpg'
    }
  ]
  ASSEMBLED_PARTS: IPart[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<IPart[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.combineParts();
  }

  combineParts(): void {
    const isAxleSelected = this.ASSEMBLED_PARTS.find(part => part.name === 'axle');
    if (isAxleSelected) {
      this.ASSEMBLED_PARTS = [{
        name: 'Car exel without tires',
        imgSrc: 'assets/Car exel without tires.jpg'
      }]
    }
    const isBoltSelected = this.ASSEMBLED_PARTS.find(part => part.name === 'bolts');
    if (isBoltSelected) {
      this.ASSEMBLED_PARTS = [{
        name: 'Car exel without tires',
        imgSrc: 'assets/Car exel without tires.jpg'
      }]
    }
    if (this.AVAILABLE_PARTS.length === 0) {
      this.ASSEMBLED_PARTS = [{
        name: 'Excel and tire',
        imgSrc: 'assets/Excel and tire.jpg'
      }]
    }
  }

}
