import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { StatusService } from './message/status.service';
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
    constructor( private http: HttpClient, private _statusService: StatusService) {}
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
    }
    registerUser(registerData) {
        localStorage.setItem(this.EMAIL_KEY, registerData.email);
        localStorage.setItem(this.PASSWORD_KEY, registerData.password);
        this.http.post<any>(this.path + '/register', registerData).subscribe(res => {
            console.log(res);
            localStorage.setItem(this.TOKEN_KEY, res.token);
        });
    }
    loginUser(loginData) {
        if (loginData.email === 'ashish@gmail.com') {
            localStorage.setItem(this.ADMIN_KEY, 'True');
        }

        localStorage.setItem(this.EMAIL_KEY, loginData.email);
        localStorage.setItem(this.PASSWORD_KEY, loginData.password);

        this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
            console.log(res);
            localStorage.setItem(this.TOKEN_KEY, res.token);
        });
    }
    registerBook(registerData) {

        this.http.post<any>(this.path + '/registerb', registerData).subscribe(res => {
            console.log(res);
            if (res === 'Error') {
                this._statusService.displayStatus('Error uploading the book', 'danger');
            } else {
                localStorage.setItem(this.EMAIL_KEY, registerData.email);
                localStorage.setItem(this.PASSWORD_KEY, registerData.password);
                this._statusService.displayStatus('Success uploading a book detail', 'success');
            }
        });
    }
    changeDetails (data) {
        this.http.post<any>(this.path + '/changeUser', data).subscribe(res => {
            if (res === 'Error') {
                this._statusService.displayStatus('Error changing data', 'danger');
            } else {
                localStorage.setItem(this.EMAIL_KEY, localStorage.getItem('email1'));
                localStorage.setItem(this.PASSWORD_KEY, localStorage.getItem('password1'));
                localStorage.removeItem('email1');
                localStorage.removeItem('password1');
                this._statusService.displayStatus('Success changing data', 'success');
            }
        });
    }
    removeBook (data) {
        this.http.post<any>(this.path + '/removeBook', data).subscribe(res => {
            if (res === 'Error') {
                this._statusService.displayStatus('Unable to delete the book.', 'danger');
            } else {
                this._statusService.displayStatus('Book deleted.', 'success');
            }
        });
    }

    makeIssue( data ) {
        this.http.post<any>(this.path + '/makeIssue', data).subscribe(res => {
            if (res === 'Error') {
                this._statusService.displayStatus('Unable to checkout', 'danger');
            } else {
                this._statusService.displayStatus('Checkout complete', 'success');
            }
        });
    }
}
