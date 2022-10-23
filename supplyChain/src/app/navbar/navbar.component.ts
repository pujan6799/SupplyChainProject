import { AddStageComponent } from './../add-stage/add-stage.component';
import { UserService, IUser } from './../../shared/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IStage } from 'src/shared/interface/stage.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userData: IUser = {
    isLoggedIn: false,
    username: '',
    isAdmin: false,
  };
  isUserLoggedIn = false;
  destroy$ = new Subject();
  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    userService.userData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userData) => {
        this.userData = userData;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  goToHome(): void {
    this.router.navigate(['home']);
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.userService.logoutUser();
    this.router.navigate(['login']);
  }

  addStage(): void {
    this.router.navigate(['add-stage']);
  }
}
