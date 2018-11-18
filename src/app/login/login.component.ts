import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../util/navigation/navigation.service';

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

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {
  }

  ngOnInit() {
    this.navigationService.showLogin = false;
    this.navigationService.showRegister = false;
    this.navigationService.showSearch = false;
  }
  register_post() {
    this.authService.registerUser(this.RegisterData);
    this.router.navigateByUrl(this.return);
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
