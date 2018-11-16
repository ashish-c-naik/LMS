import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
export interface TableElement {
  position: number;
  isbn: number;
  author: string;
  issue: string;
  due: string;
  fine: number;
}
export class ExampleHttpDao {
  constructor(private http: HttpClient) { }

  getIssues(param: string): Observable<any> {
    const href = environment.path;
    const requestUrl =
      `${href}/issue/${param}`;
    return this.http.get<any>(requestUrl);
  }
}

const ELEMENT_DATA: TableElement[] = [];
@Component({
  selector: 'app-issue-history',
  templateUrl: './issue-history.component.html',
  styleUrls: ['./issue-history.component.css']
})

export class IssueHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data;
  count = 1;
  displayedColumns: string[] = ['serial', 'isbn', 'title', 'author', 'issue', 'due', 'fine'];
  dataSource = null;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private _authService: AuthService,
    private _bookService: BookService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    new ExampleHttpDao(this.http).getIssues(localStorage.getItem('email')).subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    if (this._authService.Admin) {
      this.displayedColumns.push('Return');
    }
    console.log(ELEMENT_DATA);
  }
  getFine(due: string) {
    const todayDate = new Date();
    const dueDate = new Date(due);
    if (todayDate < dueDate ) {
      return 0;
    }
    const timeDiff = Math.abs(todayDate.getTime() - dueDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }
}
