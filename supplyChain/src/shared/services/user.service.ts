import { STAGE2, STAGE3 } from './../constants/stage.constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STAGE1 } from '../constants/stage.constants';
import { IStage } from '../interface/stage.interface';

export interface IUser {
  isLoggedIn: boolean;
  username: string;
  isAdmin: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData$ = new BehaviorSubject<IUser>({
    isLoggedIn: false,
    username: '',
    isAdmin: false,
  });
  defaultStages: IStage[] = [
    JSON.parse(JSON.stringify(STAGE1)),
    JSON.parse(JSON.stringify(STAGE2)),
    JSON.parse(JSON.stringify(STAGE3)),
  ];
  allStages = [
    JSON.parse(JSON.stringify(STAGE1)),
    JSON.parse(JSON.stringify(STAGE2)),
    JSON.parse(JSON.stringify(STAGE3)),
  ];
  stages$ = new BehaviorSubject<IStage[]>(
    JSON.parse(JSON.stringify(this.allStages))
  );
  constructor() {}

  loginUser(username: string, isAdmin: boolean): void {
    this.userData$.next({
      isLoggedIn: true,
      username,
      isAdmin,
    });
  }

  logoutUser(): void {
    this.userData$.next({
      isLoggedIn: false,
      username: '',
      isAdmin: false,
    });
  }

  updateStages(stages: IStage[]): void {
    this.allStages
    this.allStages = stages;
    this.stages$.next(this.allStages);
  }
}
