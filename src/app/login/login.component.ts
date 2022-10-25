import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    password: ['', Validators.required],
    username: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * @description Validating user entered data
   */
  login(): void {
    // Checking if user has entered username and password
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      // Checking For User Credentials
      if (username === 'user' && password === 'user') {
        // Sending user data to userService to store the data and publish all subscribed components
        this.userService.loginUser(username, false);
        this.router.navigate(['home']);
        // Checking FOr Admin Credentials
      } else if (username === 'admin' && password === 'admin') {
        // Sending user data to userService to store the data and publish all subscribed components
        this.userService.loginUser(username, true);
        this.router.navigate(['home']);
      } else {
        // Showing snackbar if crednetials are invalid
        this.snackBar.open('Invalid Credentials', '', {
          duration: 2000,
        });
      }
    }
  }
}
