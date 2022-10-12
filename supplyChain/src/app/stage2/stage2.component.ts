import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPart } from 'src/shared/interface/part.interface';
import { BoltsDialogComponent } from '../bolts-dialog/bolts-dialog.component';

@Component({
  selector: 'app-stage2',
  templateUrl: './stage2.component.html',
  styleUrls: ['./stage2.component.scss']
})
export class Stage2Component implements OnInit {

  AVAILABLE_PARTS: IPart[] = [
    {
      name: 'axleAndTires',
      imgSrc: 'assets/stage2/Excel and tire.jpg'
    },
    {
      name: 'fiberBody',
      imgSrc: 'assets/stage2/Fiber body.jpg'
    },
    {
      name: 'engine',
      imgSrc: 'assets/stage2/Car Engine.jpg'
    },
    {
      name: 'bolts',
      imgSrc: 'assets/stage2/bolts.jpg'
    },
  ]
  ASSEMBLED_PARTS: IPart[] = [];
  boltType = '';
  constructor(
    private dialog: MatDialog
  ) { }

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

  async showDialog(): Promise<string> {
    const dialogRef = this.dialog.open(BoltsDialogComponent, {
      data: {
        title: 'Bolt Types',
        bodyMessage: 'Please select bolt type.',
        showBoltTypes: true,
        boltTypes: [
          {
            name: 'Wheels Studs',
            isAvailable: false
          },
          {
            name: 'Engine Fasteners',
            isAvailable: true
          },
          {
            name: 'Interior Fasteners',
            isAvailable: false
          }
        ]
      }
    });
    ;
    const boltType = await dialogRef.afterClosed().toPromise();
    return boltType.name;
  }

  

  async showSelectBoltsDialog(): Promise<void> {
    const dialogRef = this.dialog.open(BoltsDialogComponent, {
      data: {
        title: 'Please select bolt type.',
        showBoltTypes: false
      }
    });
  }

  async combineParts(): Promise<void> {
    const isAxleAndTireSelected = this.ASSEMBLED_PARTS.find(part => part.name === 'axleAndTires');
    const isFiberBodySelected = this.ASSEMBLED_PARTS.find(part => part.name === 'fiberBody');
    const isBoltSelected = this.ASSEMBLED_PARTS.find(part => part.name === 'bolts');
    const isCarEngineSelected = this.ASSEMBLED_PARTS.find(part => part.name === 'engine');
    if (isAxleAndTireSelected && isFiberBodySelected) {
      this.ASSEMBLED_PARTS = [{
        name: 'fiberWithTires',
        imgSrc: 'assets/stage2/fiber with tires.jpg'
      }]
    }
    if (isCarEngineSelected) {
      this.ASSEMBLED_PARTS = [{
        name: 'fiberWithTires',
        imgSrc: 'assets/stage2/fiber with tires.jpg'
      }]
      await this.showSelectBoltsDialog();
    }
    if (isBoltSelected) {
      this.ASSEMBLED_PARTS = [{
        name: 'fiberWithTires',
        imgSrc: 'assets/stage2/fiber with tires.jpg'
      }]
      this.boltType = await this.showDialog();
      this.ASSEMBLED_PARTS = [{
        name: 'fiberWithTires',
        imgSrc: 'assets/stage2/fiber with tires.jpg'
      }]
    }
    if(this.AVAILABLE_PARTS.length === 0) {
      this.ASSEMBLED_PARTS = [{
        name: 'fiberBodyAndEngine',
        imgSrc: 'assets/stage2/fiber body and engine.jpg'
      }]
    }
  }

}
