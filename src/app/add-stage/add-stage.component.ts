import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { IStage } from './../../shared/interface/stage.interface';
import { UserService } from './../../shared/services/user.service';
import { NewPartDialogComponent } from '../library/new-part-dialog/new-part-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPart } from 'src/shared/interface/car.interface';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.scss'],
})
export class AddStageComponent implements OnInit, OnDestroy {
  stages: IStage[] = [];
  stageForm: FormGroup = this.fb.group({
    stageTitle: ['New Stage', [Validators.required]],
    stagePosition: [null, Validators.required],
  });
  parts: IPart[] = [];
  destroy$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    userService.stages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((stages: IStage[]) => {
        this.stages = stages;
      });
  }

  // To unsubscribe from subscription
  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  /**
   * @description When user click pn add part button, a dialog is opened in which user has to enter Part data
   *              and when user add all the data then that data is captured and new part is pushed in parts array
   */
  addPart(): void {
    const dialogRef = this.dialog.open(NewPartDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '30%',
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
            resultPart: null,
          },
          boltTypes: [],
        };
        this.parts.push(newPart);
      }
    });
  }

  /**
   * @desccription this method will save the updated stages by sending updated stages data to user service
   *               and after that navigating to home page
   */
  saveStage(): void {
    const updatedSTages = this.getUpdateStages();
    this.userService.updateStages(updatedSTages);
    this.snackbar.open('Stage Added Successfully!!', '', {
      duration: 2000,
    });
    this.router.navigate(['home']);
  }

  /**
   * @description sets user selected position in stageForm
   * @param position position of the new stage
   */
  setStagePosition(position: number): void {
    this.stageForm.get('stagePosition')?.setValue(position);
  }

  /**
   * @description creates a new stage from user entered info and adds the new stage at user selected position using splice
   * @returns updated Stages array
   */
  getUpdateStages(): IStage[] {
    const updatedStages: IStage[] = this.stages;
    const position = this.stageForm.get('stagePosition')?.value;
    const newStage: IStage = {
      title: this.stageForm.get('stageTitle')?.value,
      AVAILABLE_PARTS: this.parts,
      resultPart: null,
      totalTimeForStage: 0,
    };
    updatedStages.splice(position, 0, newStage);
    return updatedStages;
  }
}
