import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { StatusService } from '../message/status.service';
import { NavigationService } from '../util/navigation/navigation.service';

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
  constructor(
    private _authService: AuthService,
    private _statusService: StatusService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
    this.navigationService.showSearch = true;
  }

  change_details() {
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
  }
}
