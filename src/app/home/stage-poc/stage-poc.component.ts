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
  assembledParts: IPart[] = [];
  interiorBolts!: IBolt;
  boltTypes!: IBolt;
  selectedFabric!: IFabric;
  selectedWheels!: IWheel;
  selectedEngine!: IEngine;
  viewDetails = new ViewDetails();
  totalTime: number = 0;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Pushing Result part from last stage in assembled parts array.
    if (this.resultFromLastStage) {
      this.assembledParts.push(this.resultFromLastStage);
    }
    // Updating total time taken by adding previous stage total time taken
    this.totalTime += this.previousStageTime;
  }

  // When drag and drop event is happened then this function is called
  async drop(event: CdkDragDrop<IPart[]>) {
    this.combineParts();
  }

  // Opens a dialog to select a fabric type and sending selected fabric to parent using event emitter
  async selectFabricType(): Promise<void> {
    const dialogRef = this.dialog.open(InteriorDialogComponent, {
      disableClose: true,
      width: '25%',
    });
    this.selectedFabric = await firstValueFrom(dialogRef.afterClosed());
    this.interiorSelected.emit({
      fabric: this.selectedFabric,
    });
  }

  /**
   * @description SHhwing a dialog to user where he will select a type (Wheel, Engine, Bolts etc)
   * @param title Title tos show in dialog
   * @param bodyMessage MEssage to show in dialog
   * @param types Types to show in the dialog for user selection
   * @returns Promise of user selected type
   */
  async choseType(
    title: string = '',
    bodyMessage: string = 'Select Type',
    types: any[] = []
  ): Promise<any> {
    const dialogRef = this.dialog.open(SelectTypeDialogComponent, {
      disableClose: true,
      width: '25%',
      data: {
        title,
        bodyMessage: bodyMessage || '',
        types: types,
      },
    });
    return await firstValueFrom(dialogRef.afterClosed());
  }

  /**
   * @description Whenever drag and drop happens this method is called
   */
  async combineParts(): Promise<void> {
    // Removing 1st part from available part which will be part selected by user
    const selectedPart = this.availableParts.shift();
    if (selectedPart) {
      // If selectedPart has boltTypes then showing dialog to select boltType
      if (selectedPart.boltTypes.length) {
        this.interiorBolts = await this.choseType(
          'Bolts',
          'Select Bolt Types',
          selectedPart.boltTypes
        );
        this.interiorBoltsSelected.emit(this.interiorBolts);
        // If selectedPart has showWheelTypes as true then showing dialog to select Wheel Type
      } else if (selectedPart.showWheelTypes) {
        this.selectedWheels = await this.choseType(
          'Wheels',
          'Select Wheel Type',
          selectedPart.wheelTypes
        );
        this.wheelsSelected.emit(this.selectedWheels);
        // If selectedPart has showEngineTypes as true then showing dialog to select Engine Type
      } else if (selectedPart.showEngineTypes) {
        this.selectedEngine = await this.choseType(
          'Engine',
          'Select Engine Type',
          selectedPart.engineTypes
        );
        this.engineSelected.emit(this.selectedEngine);
        // If selectedPart has showFabricType as true then showing dialog to select Fabric Type
      } else if (selectedPart.showFabricType) {
        await this.selectFabricType();
      }
      if (selectedPart.resultPart) {
        // If Selected Part has result part then setting assembled part as that result part
        this.assembledParts = [selectedPart.resultPart];
      } else {
        // If Selected Part does not have result part then setting assembled part as selected part
        this.assembledParts = [selectedPart];
      }
      this.updateTime(selectedPart);
    }
  }

  /**
   * @description set showDetailsOf property of viewDetails Class true
   * @param detailsOf Which details user wants to see
   */
  viewDetailsOf(detailsOf: string): void {
    this.viewDetails.showDetailsOf = detailsOf;
  }

  /**
   * @description Whenever user selects a part then this mathod is called
   * @param part part for which time total time taken needs to be updated
   */
  updateTime(part: IPart): void {
    this.totalTime += part.timeRequired;
  }
}
