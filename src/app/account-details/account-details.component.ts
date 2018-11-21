import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { StatusService } from '../message/status.service';
import { NavigationService } from '../util/navigation/navigation.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  hidePassword = true;
  AccountDetails = {
    previous: '',
    email: '',
    password: '',
    confirm_password: ''
  };
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.minLength(6)]);

  getErrorMessageEmail() {
    return this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('minLength') ? 'Minimum length of password must be 6' :
            '';
  }
  constructor(
    private _authService: AuthService,
    private _statusService: StatusService,
    private navigationService: NavigationService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
    this.navigationService.showSearch = true;
  }

  change_details() {
    if (this.email.status === 'VALID' && this.password.status === 'VALID') {
      if (this.AccountDetails.email === null || this.AccountDetails.password === null) {
        this._statusService.displayStatus('Fill atleast one detail', 'warn');
        return;
      } else if (this.AccountDetails.email === '') {
        this.AccountDetails.email = localStorage.getItem('email');
      } else if ( this.AccountDetails.password === '') {
        this.AccountDetails.password = localStorage.getItem('password');
      }
      this.AccountDetails.previous = localStorage.getItem('email');
      localStorage.setItem('email1', this.AccountDetails.email);
      localStorage.setItem('password1', this.AccountDetails.password);
      this._authService.changeDetails(this.AccountDetails);
    } else {
      this.statusService.displayStatus('There are errors in the register form', 'warning');
    }
  }
}
