import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from '../category.enum';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { NavigationService } from '../util/navigation/navigation.service';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css']
})
export class RegisterBookComponent implements OnInit {
  RegisterBook = {
    title: '',
    author: '',
    isbn: null,
    category: '',
    location: '',
    availability: null,
  };
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _bookService: BookService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.navigationService.showLogin = false;
    this.navigationService.showRegister = false;
    this.navigationService.showSearch = false;
  }
  register_post() {
    this._authService.registerBook(this.RegisterBook);
  }
}
