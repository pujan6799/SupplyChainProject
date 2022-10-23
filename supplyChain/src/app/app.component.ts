import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'supplyChain';
  destroy$ = new Subject();
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    userService.userData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      userData => {
        if (!userData.isLoggedIn) {
          router.navigate(['login']);
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
