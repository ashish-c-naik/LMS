import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { StatusService } from './message/status.service';
import { Route, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    messages = [];
    path = environment.path + '/auth';
    TOKEN_KEY = 'token';
    email = 'ashish@gmail.com';
    ADMIN_KEY = 'admin';
    EMAIL_KEY = 'email';
    PASSWORD_KEY = 'password';

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    constructor(
        private http: HttpClient,
        private _statusService: StatusService,
        private router: Router
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
        localStorage.removeItem(this.PASSWORD_KEY);
        this._statusService.displayStatus('Logged out', 'success');
    }
    registerUser(registerData) {
        localStorage.setItem(this.EMAIL_KEY, registerData.email);
        localStorage.setItem(this.PASSWORD_KEY, registerData.password);
        this.http.post<any>(this.path + '/register', registerData).subscribe(res => {
            console.log(res);
            localStorage.setItem(this.TOKEN_KEY, res.token);
            this._statusService.displayStatus('Registered! yay!', 'success');
        });
    }
    loginUser(loginData) {
        if (loginData.email === 'ashish@gmail.com') {
            localStorage.setItem(this.ADMIN_KEY, 'True');
        }
        this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
            console.log(res);
            localStorage.setItem(this.EMAIL_KEY, loginData.email);
            localStorage.setItem(this.PASSWORD_KEY, loginData.password);
            localStorage.setItem(this.TOKEN_KEY, res.token);
            this._statusService.displayStatus('Logged in! yay!', 'success');
        });
    }
    registerBook(registerData) {

        this.http.post<any>(this.path + '/registerb', registerData).subscribe(res => {
                localStorage.setItem(this.EMAIL_KEY, registerData.email);
                localStorage.setItem(this.PASSWORD_KEY, registerData.password);
                this._statusService.displayStatus('Success uploading a book detail', 'success');
                this.routeReload();
        });
    }
    changeDetails (data) {
        this.http.post<any>(this.path + '/changeUser', data).subscribe(res => {
                localStorage.setItem(this.EMAIL_KEY, localStorage.getItem('email1'));
                localStorage.setItem(this.PASSWORD_KEY, localStorage.getItem('password1'));
                localStorage.removeItem('email1');
                localStorage.removeItem('password1');
                this._statusService.displayStatus('Success changing data', 'success');
                this.routeReload();
        });
    }
    removeBook (data) {
        this.http.post<any>(this.path + '/removeBook', data).subscribe(res => {
                this._statusService.displayStatus('Book deleted.', 'success');
                this.routeReload();
        });
    }

    makeIssue( data ) {
        this.http.post<any>(this.path + '/makeIssue', data)
        .subscribe(res => {
                console.log(res);
                this._statusService.displayStatus('Checkout complete', 'success');
                this.routeReload();
        });
    }
    removeIssues(isbn) {
        this.http.post<any>(this.path + '/removeIssue', isbn).subscribe(res => {
                this._statusService.displayStatus('Success', 'success');
                this.routeReload();
        });
    }

    routeReload() {
        window.location.reload();
    }

    handleError(error: HttpErrorResponse) {
    return throwError('sadf');
    }
}
