import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { IStage } from './../../shared/interface/stage.interface';
import { UserService } from './../../shared/services/user.service';
import { AddBoltTypeDialogComponent } from '../library/add-bolt-type-dialog/add-bolt-type-dialog.component';
import { NewPartDialogComponent } from '../library/new-part-dialog/new-part-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPart, IBolt } from 'src/shared/interface/car.interface';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.scss'],
})
export class AddStageComponent implements OnInit, OnDestroy {

  stages: IStage[] = [];
  stageForm: FormGroup = this.fb.group({
    stageTitle: ['Stage 2', [Validators.required]],
    stagePosition: [null, Validators.required]
  });
  parts: IPart[] = [];
  destroy$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {
    userService.stages$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((stages: IStage[]) => {
      this.stages = stages;
      console.log(this.stages);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {}
  addPart(): void {
    const dialogRef = this.dialog.open(NewPartDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '30%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newPart: IPart = {
          title: result.title,
          img: result.img,
          timeRequired: result.timeRequired ?? 0,
          resultPart: {
            title: '',
            img: result.resultImg,
            boltTypes: [],
            timeRequired: 0,
            resultPart: null
          },
          boltTypes: [],
        }
        this.parts.push(newPart);
        console.log(this.parts);
      }
    });
  }

  addBolt(part: IPart): void {
    const dialogRef = this.dialog.open(AddBoltTypeDialogComponent);
    dialogRef.afterClosed().subscribe((boltData: IBolt) => {
      if (boltData) {
        part.boltTypes.push(boltData);
      }
    });
  }

  saveStage(): void {
    const updatedSTages = this.getUpdateStages();
    this.userService.updateStages(updatedSTages);
    this.router.navigate(['home']);
  }

  setStagePosition(position: number): void {
    this.stageForm.get('stagePosition')?.setValue(position);
    console.log(this.stageForm.value);
    
  }

  getUpdateStages(): IStage[] {
    const updatedStages: IStage[] = this.stages;
    const position = this.stageForm.get('stagePosition')?.value;
    const newStage: IStage = {
      title: this.stageForm.get('stageTitle')?.value,
      AVAILABLE_PARTS: this.parts,
      resultPart: null,
      totalTimeForStage: 0
    };
    updatedStages.splice(position, 0, newStage);
    return updatedStages;
  }
}
