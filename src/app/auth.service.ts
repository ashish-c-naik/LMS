import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { StatusService } from './message/status.service';
import { Route, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ThemeService } from './theme.service';

@Injectable()
export class AuthService {
    messages = [];
    path = environment.path + '/auth';
    TOKEN_KEY = 'token';
    email = 'ashish@gmail.com';
    ADMIN_KEY = 'admin';
    EMAIL_KEY = 'email';

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    constructor(
        private http: HttpClient,
        private _statusService: StatusService,
        private router: Router,
        private themeService: ThemeService
    ) {}
    get Email() {
        return this.email;
    }
    get Admin() {
        return localStorage.getItem(this.ADMIN_KEY) === 'True';
    }
    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }
    logout(): void {
        localStorage.removeItem(this.ADMIN_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.EMAIL_KEY);
        this._statusService.displayStatus('Logged out', 'success');
        this.routeReload();
    }
    registerUser(registerData) {
        localStorage.setItem(this.EMAIL_KEY, registerData.email);
        this.http.post<any>(this.path + '/register', registerData).subscribe(res => {
            console.log(res);
            localStorage.setItem(this.TOKEN_KEY, res.token);
            this._statusService.displayStatus('Registered!', 'success');
            this.routeReload();
        }, (err) => {
            this._statusService.displayStatus('Problem with the registration. Email ID may already be in use. Please try again!', 'danger');
        });
    }
    loginUser(loginData) {
        if (loginData.email === 'ashish@gmail.com') {
            localStorage.setItem(this.ADMIN_KEY, 'True');
        }
        this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
            console.log(res);
            localStorage.setItem(this.EMAIL_KEY, loginData.email);
            localStorage.setItem(this.TOKEN_KEY, res.token);
            this._statusService.displayStatus('Logged in', 'success');
            this.routeReload();
        }, (err) => {
            this._statusService.displayStatus('Invalid email or password!', 'danger');
        });
    }
    registerBook(registerData) {

        this.http.post<any>(this.path + '/registerb', registerData).subscribe(res => {
                this._statusService.displayStatus('Success registering a book', 'success');
                // this.routeReload();
                window.location.reload();
        }, (err) => {
            this._statusService.displayStatus('Error! Already have a book with same Book id', 'danger', 10000);
        });
    }
    changeDetails (data) {
        this.http.post<any>(this.path + '/changeUser', data).subscribe(res => {
                this._statusService.displayStatus('Success changing the account details', 'success');
                this.routeReload();
        }, (err) => {
            this._statusService.displayStatus('Error changing the account details', 'danger');
        });
    }
    removeBook (data) {
        this.http.post<any>(this.path + '/removeBook', data).subscribe(res => {
                this._statusService.displayStatus('Book deleted', 'success');
                this.routeReload();
        }, (err) => {
            this._statusService.displayStatus('Error deleting the book', 'danger');
        });
    }

    updateBook (data) {
        this.http.post<any>(this.path + '/updateBook', data).subscribe(res => {
                this._statusService.displayStatus('Book updated', 'success');
                this.routeReload();
        }, (err) => {
            this._statusService.displayStatus('Error updating the book', 'danger');
        });
    }

    makeIssue( data ) {
        this.http.post<any>(this.path + '/makeIssue', data)
        .subscribe(res => {
                console.log(res);
                this._statusService.displayStatus('Checkout complete', 'success');
                this.routeReload();
        }, (err) => {
            this._statusService.displayStatus('The book may already be checked out under same email!', 'danger', 10000);
        });
    }
    removeIssues(data) {
        this.http.post<any>(this.path + '/removeIssue', data).subscribe(res => {
            this._statusService.displayStatus('Successfully returned the book', 'success');
            window.location.reload();
            // this.routeReload();
        } , (err) => {
            this._statusService.displayStatus('Error. Something went wrong.', 'danger');
        });
    }

    routeReload() {
        console.log(this.router.url);
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
    }
}
