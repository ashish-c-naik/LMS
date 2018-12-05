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
    email: localStorage.getItem('email'),
    password: ''
  };
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  getErrorMessageEmail() {
    return this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
    this.password.hasError('minLength') ? 'Minimum length of password must be 6' :
            '';
  }
  constructor(
    public _authService: AuthService,
    public _statusService: StatusService,
    public navigationService: NavigationService,
    public statusService: StatusService
  ) { }

  ngOnInit() {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
    this.navigationService.showSearch = true;
  }

  change_details() {
    if (this.email.status === 'VALID' && this.password.status === 'VALID') {
      this._authService.changeDetails(this.AccountDetails);
    } else {
      this.statusService.displayStatus('There are errors in the form', 'warning');
    }
  }
}
