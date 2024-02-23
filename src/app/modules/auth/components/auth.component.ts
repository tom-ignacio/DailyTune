import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent extends BaseComponent implements OnInit {

  userFormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
  loggedIn: boolean = false;
  
  constructor(
    private authService: AuthService,
    public router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.router.navigate(['home']);
    }
  }

  logIn(): void {
    this.authService.getAuthAPI(this.userFormControl.value, this.ngUnsubscribe);
    this.loggedIn = true;
  }
}
