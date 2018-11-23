import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../util/navigation/navigation.service';
import { DialogData } from '../browse/browse.component';
import { FormControl, Validators } from '@angular/forms';
import { StatusService } from '../message/status.service';

export interface TableElement {
  position: number;
  isbn: number;
  author: string;
  issue: string;
  due: string;
  fine: number;
}
export class ExampleHttpDao {
  constructor(public http: HttpClient) { }

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
  firstRadio = true;
  index = 0;
  data: TableElement[] = [];
  count = 1;
  displayedColumns: string[] = ['serial', 'isbn', 'title', 'author', 'issue', 'due', 'fine', 'return'];
  dataSource = null;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    public dialog: MatDialog,
    public _authService: AuthService,
    public _bookService: BookService,
    public http: HttpClient,
    public navigationService: NavigationService,
    public statusService: StatusService
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
      this.displayedColumns = ['serial', 'isbn', 'title', 'author', 'issue', 'due', 'fine', 'email', 'return'];
    }
  }

  applyfilter (event) {
    this.applyFilter(event);
    this.firstRadio = true;
    console.log(this.firstRadio);
  }
 OnChanges () {
  new ExampleHttpDao(this.http).getIssues(localStorage.getItem('email'), localStorage.getItem('admin') === 'True').subscribe(res => {
    this.data = res;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  });
 }
  onPaginateChange (event) {
    this.index = event.pageIndex * event.pageSize;
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

  return(isbn: number, email: string) {
    this._authService.removeIssues({isbn: isbn, email: email});
  }
  openDialog(isbn, email): void {
    const dialogRef = this.dialog.open(Dialog1Component, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.return(isbn, email);
      } else {
        this.statusService.displayStatus('Cancelled the operation', 'info');
      }
    });
  }
}
@Component({
  selector: 'app-dialog',
  template: `
  <div>
    <h1 mat-dialog-title>Checkout</h1>
      <mat-dialog-content>
        <p>Are you sure?</p>
      </mat-dialog-content>
      <div mat-dialog-actions>
        <button mat-button (click)="dialogRef.close(false)">Cancel</button>
        <button mat-button (click)="dialogRef.close(true)" cdkFocusInitial>Ok</button>
      </div>
</div>`,
})
export class Dialog1Component {
  constructor(
    public _authService: AuthService,
    public dialogRef: MatDialogRef<Dialog1Component>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
