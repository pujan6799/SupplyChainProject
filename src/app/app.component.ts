import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'supplyChain';
  destroy$ = new Subject();
  constructor(private userService: UserService, private router: Router) {
    this.userService.userData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userData) => {
        // If user has not logged in then routing to Login Page
        if (!userData.isLoggedIn) {
          this.router.navigate(['login']);
        }
      });
  }

  /**
   * @description To unsubscriobe from userData subscription
   */
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
