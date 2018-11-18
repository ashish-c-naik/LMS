import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../util/navigation/navigation.service';

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

  getIssues(param: string, isAdmin: boolean): Observable<any> {
    const href = environment.path;
    let requestUrl;
    if (isAdmin) {
      requestUrl =
      `${href}/issues`;

    } else {
    requestUrl =
      `${href}/issue/${param}`;
    }
    return this.http.get<any>(requestUrl);
  }
}

@Component({
  selector: 'app-issue-history',
  templateUrl: './issue-history.component.html',
  styleUrls: ['./issue-history.component.css']
})

export class IssueHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data: TableElement[] = [];
  count = 1;
  displayedColumns: string[] = ['serial', 'isbn', 'title', 'author', 'issue', 'due', 'fine'];
  dataSource = null;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private _authService: AuthService,
    private _bookService: BookService,
    private http: HttpClient,
    private navigationService: NavigationService
  ) {
  }

  ngOnInit() {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
    this.navigationService.showSearch = true;
    new ExampleHttpDao(this.http).getIssues(localStorage.getItem('email'), localStorage.getItem('admin') === 'True').subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    if (this._authService.Admin) {
      this.displayedColumns.push('email');
      this.displayedColumns.push('return');
    }
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
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

  return(isbn: number) {
    this._authService.removeIssues({isbn: isbn});
  }
}
