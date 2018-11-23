import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from '../category.enum';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { NavigationService } from '../util/navigation/navigation.service';
import { Validators, FormControl } from '@angular/forms';
import { StatusService } from '../message/status.service';

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

  title = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  isbn  = new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]);
  category = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  availability = new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]);


  getErrorMessageTitle() {
    return this.title.hasError('required') ? 'You must enter a value' :
        '';
  }

  getErrorMessageAuthor() {
    return this.author.hasError('required') ? 'You must enter a value' :
        '';
  }

  getErrorMessageISBN() {
    return this.isbn.hasError('required') ? 'You must enter a value' :
    this.title.hasError('pattern') ? 'Invalid ISBN' :
        '';
  }

  getErrorMessageCategory() {
    return this.category.hasError('required') ? 'You must enter a value' :
        '';
  }

  getErrorMessageLocation() {
    return this.location.hasError('required') ? 'You must enter a value' :
        '';
  }

  getErrorMessageAvailability() {
    return this.availability.hasError('required') ? 'You must enter a value' :
    this.title.hasError('pattern') ? 'Invalid entry' :
        '';
  }
  constructor(
    public _authService: AuthService,
    public _router: Router,
    public _bookService: BookService,
    public navigationService: NavigationService,
    public _statusService: StatusService
  ) { }

  ngOnInit() {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
    this.navigationService.showSearch = false;
  }
  register_post() {
    if (this.title.status === 'VALID' &&  this.author.status === 'VALID' &&
    this.isbn.status === 'VALID' && this.category.status === 'VALID' &&
    this.location.status === 'VALID' && this.availability.status === 'VALID'
  ) {
    this._authService.registerBook(this.RegisterBook);
  } else {
    this._statusService.displayStatus('There are errors in the form', 'warning');
  }
  }
}
