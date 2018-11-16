import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    password: '',
    confirm_password: ''
  };
  return: string;
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }
  register_post() {
    console.log(this.RegisterData);
    this.authService.registerUser(this.RegisterData);
    this.router.navigateByUrl(this.return);
  }
  login_post() {
    this.authService.loginUser(this.loginData);
    this.router.navigateByUrl(this.return);
  }
}
