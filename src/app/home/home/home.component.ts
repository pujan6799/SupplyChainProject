import { IStage } from 'src/shared/interface/stage.interface';
import { map, Subject, takeUntil } from 'rxjs';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IBolt,
  IConfiguration,
  IEngine,
  IInterior,
  IWheel,
} from 'src/shared/interface/car.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedColor = '';
  configuration: IConfiguration = {
    wheel: {
      title: '',
      manufacturer: '',
      dimensions: '',
      warranty: '',
      isAvailable: true,
    },
    engine: {
      title: '',
      manufacturer: '',
      capacity: '',
      warranty: '',
      isAvailable: true,
    },
    interior: {
      fabric: {
        name: '',
        img: '',
      },
    },
    carImg: '',
    bolts: [],
  };
  stages: IStage[] = [];
  destroy$ = new Subject();
  constructor(private userService: UserService) {
    this.userService.stages$
      .pipe(
        takeUntil(this.destroy$),
        map((stages: IStage[]) => {
          // Mapping stages to add usefule info to each stage
          return stages.map((stage, index) => {
            // Calculating total time requried for stage by adding timeRequired for each available part of stage
            let totalTimeForStage = stage.AVAILABLE_PARTS.reduce(
              (prevValue, currentVal) => {
                return prevValue + currentVal.timeRequired;
              },
              0
            );
            if (index !== 0) {
              const prevStageTime = stages[index - 1].totalTimeForStage;
              const prevStage = stages[index - 1];
              const prevStageResultPart =
                prevStage.AVAILABLE_PARTS[prevStage.AVAILABLE_PARTS.length - 1]
                  .resultPart;
              // result part of the stage will be result part of previous stage's last available part
              stage.resultPart = prevStageResultPart;
              // Total time will be updated by adding last stage's time required
              totalTimeForStage += prevStageTime;
            }
            stage.totalTimeForStage = totalTimeForStage;
            return JSON.parse(JSON.stringify(stage));
          });
        })
      )
      .subscribe((stages) => {
        this.stages = stages;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  // Setting selectedColor property of component
  setColor(color: any): void {
    this.selectedColor = color;
  }

  // Saving Wheels selected by user in configuration
  wheelsSelected(wheels: IWheel): void {
    this.configuration.wheel = wheels;
  }

  // Saving Bolts selected by user in configuration
  boltsSelected(bolts: IBolt): void {
    this.configuration.bolts.push(bolts);
  }

  // Saving Engine selected by user in configuration
  engineSelected(engine: IEngine): void {
    this.configuration.engine = engine;
  }

  // Saving Interior selected by user in configuration
  interiorSelected(interior: IInterior): void {
    this.configuration.interior = interior;
  }

  // Saving Car selected by user in configuration
  carColorSelected(carImg: any): void {
    carImg = String(carImg);
    this.configuration.carImg = carImg as string;
  }

  ngOnInit(): void {}
}
