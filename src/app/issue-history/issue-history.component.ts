import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AuthService } from '../auth.service';


const ELEMENT_DATA: any[] = [
  // {position: 1, BookId: 123, BookTitle: 'The way it is', Author: 'J.K. Rowling',
  //  Issue: Date.now(), Due: Date.now(), Fine: 0, Return: 1}
];
@Component({
  selector: 'app-issue-history',
  templateUrl: './issue-history.component.html',
  styleUrls: ['./issue-history.component.css']
})

export class IssueHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'BookId', 'BookTitle', 'Author', 'Issue', 'Due', 'Fine'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._authService.getIssues({email: localStorage.getItem('email')});
    ELEMENT_DATA.push(this._authService.issues);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    if (this._authService.Admin) {
      this.displayedColumns.push('Return');
    }
    this.dataSource.paginator = this.paginator;
  }
  return (id: number) {
    console.log(id);
  }
}
