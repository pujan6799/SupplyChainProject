import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPart } from 'src/shared/interface/part.interface';
import { BoltsDialogComponent } from '../bolts-dialog/bolts-dialog.component';

@Component({
  selector: 'app-stage1',
  templateUrl: './stage1.component.html',
  styleUrls: ['./stage1.component.scss']
})
export class Stage1Component implements OnInit {

  AVAILABLE_PARTS: IPart[] = [
    {
      name: 'axle',
      imgSrc: 'assets/Excel.jpg'
    },
    {
      name: 'wheels',
      imgSrc: 'assets/wheels.png'
    },
    {
      name: 'bolts',
      imgSrc: 'assets/bolts.jpg'
    }
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
            isAvailable: true
          },
          {
            name: 'Engine Fasteners',
            isAvailable: false
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
    const isAxleSelected = this.ASSEMBLED_PARTS.find(part => part.name === 'axle');
    const isWheelsSelected = this.ASSEMBLED_PARTS.find(part => part.name === 'wheels');
    const isBoltSelected = this.ASSEMBLED_PARTS.find(part => part.name === 'bolts');
    if (isAxleSelected) {
      this.ASSEMBLED_PARTS = [{
        name: 'Car exel without tires',
        imgSrc: 'assets/Car exel without tires.jpg'
      }]
    }
    if (isWheelsSelected) {
      await this.showSelectBoltsDialog();
      this.ASSEMBLED_PARTS = [{
        name: 'Car exel without tires',
        imgSrc: 'assets/Car exel without tires.jpg'
      }]
    }
    if (isBoltSelected) {
      this.ASSEMBLED_PARTS = [{
        name: 'Car exel without tires',
        imgSrc: 'assets/Car exel without tires.jpg'
      }]
      this.boltType = await this.showDialog();
      this.ASSEMBLED_PARTS = [{
        name: 'Car exel without tires',
        imgSrc: 'assets/Car exel without tires.jpg'
      }]
    }
    if(this.AVAILABLE_PARTS.length === 0) {
      this.ASSEMBLED_PARTS = [{
        name: 'Excel and tire',
        imgSrc: 'assets/Excel and tire.jpg'
      }]
    }
  }

}
