import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../util/navigation/navigation.service';
import { FormControl, Validators } from '@angular/forms';
import { StatusService } from '../message/status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };
  RegisterData = {
    email: '',
    password: ''
  };
  return: string;
  hidePasswordRegister = true;
  hidePasswordLogin = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  email1 = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password1 = new FormControl('', [Validators.required, Validators.minLength(6)]);

  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorMessageEmail1() {
    return this.email1.hasError('required') ? 'You must enter a value' :
      this.email1.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('minLength') ? 'Minimum length of password must be 6' :
        '';
  }
  getErrorMessagePassword1() {
    return this.password1.hasError('required') ? 'You must enter a value' :
      this.password1.hasError('minLength') ? 'Minimum length of password must be 6' :
        '';
  }
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private statusService: StatusService
  ) {
  }

  ngOnInit() {
    this.navigationService.showLogin = false;
    this.navigationService.showRegister = false;
    this.navigationService.showSearch = false;
  }
  register_post() {
    if (this.email.status === 'VALID' && this.password.status === 'VALID') {
      this.authService.registerUser(this.RegisterData);
    } else {
      this.statusService.displayStatus('There are errors in the register form', 'warning');
    }
  }
  login_post() {
    if (this.email1.status === 'VALID' && this.password1.status === 'VALID') {
      this.authService.loginUser(this.loginData);
    } else {
      this.statusService.displayStatus('There are errors in the Login form', 'warning');
    }
  }
  onDestroy() {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
  }
}
