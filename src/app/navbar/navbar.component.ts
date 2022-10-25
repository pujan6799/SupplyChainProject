import { UserService, IUser } from './../../shared/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';

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
  constructor(private router: Router, private userService: UserService) {
    userService.userData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userData) => {
        this.userData = userData;
      });
  }

  // To unsubscribe once component is destroyed
  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  /**
   * @description To route to home page
   */
  goToHome(): void {
    this.router.navigate(['home']);
  }

  /**
   * @description To route to Login page
   */
  goToLogin(): void {
    this.router.navigate(['login']);
  }

  /**
   * @description removing userdata from service and routing to login page
   */
  logout(): void {
    this.userService.logoutUser();
    this.router.navigate(['login']);
  }

  /**
   * @description Routing to Add Stage Page
   */
  addStage(): void {
    this.router.navigate(['add-stage']);
  }
}
