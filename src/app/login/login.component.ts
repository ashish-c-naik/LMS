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
  password = new FormControl('', [Validators.required,
    Validators.pattern('.{6,}')]);
  password1 = new FormControl('', [Validators.required,
      Validators.pattern('.{6,}')]);

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
  getErrorMessagPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('pattern') ? 'Not a valid password' :
            '';
  }
  getErrorMessagPassword1() {
    return this.password1.hasError('required') ? 'You must enter a value' :
        this.password1.hasError('pattern') ? 'Not a valid password' :
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
    if ( this.email.status === 'VALID' && this.password.status === 'VALID' ) {
      this.authService.registerUser(this.RegisterData);
      this.router.navigateByUrl(this.return);
    } else {
      this.statusService.displayStatus('There are errors in the form', 'warning');
    }
  }
  login_post() {
    this.authService.loginUser(this.loginData);
    this.router.navigateByUrl(this.return);
  }
  onDestroy () {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
  }
}
