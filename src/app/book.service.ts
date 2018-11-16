import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { StatusService } from './message/status.service';
@Injectable()
export class BookService {

    path = environment.path;
    books = [];

    constructor (
        private http: HttpClient,
        private _statusService: StatusService
    ) {

    }
    getBooks(param: string) {
        this.http.get<any>(this.path + '/browse/' + param).subscribe(res => {
            this.books = res;
        });
    }
}
