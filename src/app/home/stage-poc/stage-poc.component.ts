import { SelectTypeDialogComponent } from './../../library/select-type-dialog/select-type-dialog.component';
import {
  IBolt,
  IEngine,
  IFabric,
  IInterior,
  IPart,
  IWheel,
} from './../../../shared/interface/car.interface';
import { InteriorDialogComponent } from './../../library/interior-dialog/interior-dialog.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ViewDetails } from 'src/shared/classes/ViewDetails';

@Component({
  selector: 'app-stage-poc',
  templateUrl: './stage-poc.component.html',
  styleUrls: ['./stage-poc.component.scss'],
})
export class StagePOCComponent implements OnInit {
  @Input() stageTitle = '';
  @Input() nextStageBtnTitle = 'Next Stage';
  @Input() availableParts: IPart[] = [];
  @Input() resultFromLastStage!: IPart | null;
  @Input() previousStageTime: number = 0;
  @Output() wheelsSelected = new EventEmitter<IWheel>();
  @Output() engineSelected = new EventEmitter<IEngine>();
  @Output() interiorSelected = new EventEmitter<IInterior>();
  @Output() interiorBoltsSelected = new EventEmitter<IBolt>();
  @Output() exteriorBoltsSelected = new EventEmitter<IBolt>();
  assembledParts: IPart[] = [];
  interiorBolts!: IBolt;
  boltTypes!: IBolt;
  exteriorBolts!: IBolt;
  selectedFabric!: IFabric;
  selectedWheels!: IWheel;
  selectedEngine!: IEngine;
  viewDetails = new ViewDetails();
  totalTime: number = 0;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.resultFromLastStage) {
      this.assembledParts.push(this.resultFromLastStage);
    }
    this.totalTime += this.previousStageTime;
  }

  async drop(event: CdkDragDrop<IPart[]>) {
    this.combineParts();
  }

  async selectFabricType(): Promise<void> {
    const dialogRef = this.dialog.open(InteriorDialogComponent, {
      disableClose: true,
      width: '25%',
      // height: '25%',
    });
    this.selectedFabric = await firstValueFrom(dialogRef.afterClosed());
    this.interiorSelected.emit({
      fabric: this.selectedFabric,
    });
  }

  async choseType(
    title: string = '',
    bodyMessage: string = 'Select Type',
    types: any[] = []
  ): Promise<any> {
    const dialogRef = this.dialog.open(SelectTypeDialogComponent, {
      disableClose: true,
      width: '25%',
      // height: '50%',
      data: {
        title,
        bodyMessage: bodyMessage || '',
        types: types,
      },
    });
    return await firstValueFrom(dialogRef.afterClosed());
  }

  async combineParts(): Promise<void> {
    const selectedPart = this.availableParts.shift();
    console.log(selectedPart);

    if (selectedPart) {
      // Bolts
      if (selectedPart.boltTypes.length) {
        this.interiorBolts = await this.choseType(
          'Bolts',
          'Select Bolt Types',
          selectedPart.boltTypes
        );
        this.interiorBoltsSelected.emit(this.interiorBolts);
      } else if (selectedPart.showWheelTypes) {
        this.selectedWheels = await this.choseType(
          'Wheels',
          'Select Wheel Type',
          selectedPart.wheelTypes
        );
        this.wheelsSelected.emit(this.selectedWheels);
      } else if (selectedPart.showEngineTypes) {
        this.selectedEngine = await this.choseType(
          'Engine',
          'Select Engine Type',
          selectedPart.engineTypes
        );
        this.engineSelected.emit(this.selectedEngine);
      } else if (selectedPart.showFabricType) {
        await this.selectFabricType();
      }
      if (selectedPart.resultPart) {
        this.assembledParts = [selectedPart.resultPart];
      } else {
        this.assembledParts = [selectedPart];
      }
      this.updateTime(selectedPart);
    }
  }

  viewDetailsOf(detailsOf: string): void {
    this.viewDetails.showDetailsOf = detailsOf;
  }

  updateTime(part: IPart): void {
    this.totalTime += part.timeRequired;
  }
}
