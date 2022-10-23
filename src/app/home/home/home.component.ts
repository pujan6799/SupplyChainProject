import { IStage } from 'src/shared/interface/stage.interface';
import { map, Subject, takeUntil } from 'rxjs';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { STAGE1 } from 'src/shared/constants/stage.constants';
import { IBolt, IConfiguration, IEngine, IInterior, IWheel } from 'src/shared/interface/car.interface';

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
      isAvailable: true
    },
    engine: {
      title: '',
      manufacturer: '',
      capacity: '',
      warranty: '',
      isAvailable: true
    },
    interior: {
      fabric: {
        name: '',
        img: '',
      }
    },
    carImg: '',
    bolts: []

  };
  stages: IStage[] = [];
  destroy$ = new Subject();
  constructor(private _formBuilder: FormBuilder, private userService: UserService) {
    userService.stages$.pipe(
      takeUntil(this.destroy$),
      map((stages: IStage[]) => {
        return stages.map((stage, index) => {
          let totalTimeForStage = stage.AVAILABLE_PARTS.reduce((prevValue, currentVal) => {
            return prevValue + currentVal.timeRequired;
          }, 0);
          if (index !== 0) {
            const prevStageTime = stages[index-1].totalTimeForStage;
            const prevStage = stages[index - 1];
            const prevStageResultPart = prevStage.AVAILABLE_PARTS[prevStage.AVAILABLE_PARTS.length - 1].resultPart;
            stage.resultPart = prevStageResultPart;
            totalTimeForStage += prevStageTime;
          }
          stage.totalTimeForStage = totalTimeForStage;
          return JSON.parse(JSON.stringify(stage));
        });
      })
    ).subscribe(stages => {
      this.stages = stages;
      console.log(stages);

    })
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  setColor(color: any): void {
    this.selectedColor = color;
  }

  wheelsSelected(wheels: IWheel): void {
    this.configuration.wheel = wheels;
  }

  boltsSelected(bolts: IBolt): void {
    this.configuration.bolts.push(bolts);
  }

  engineSelected(engine: IEngine): void {
    this.configuration.engine = engine;
  }

  interiorSelected(interior: IInterior): void {
    this.configuration.interior = interior;
  }

  carColorSelected(carImg: any): void {
    console.log(carImg);

    carImg = String(carImg);
    this.configuration.carImg = carImg as string;
  }

  ngOnInit(): void { }
}
