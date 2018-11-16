import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { AuthService } from '../auth.service';
import { Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryEnum } from '../category.enum';
import { ActivatedRoute, Router, NavigationStart, Params, NavigationEnd } from '@angular/router';
import { BookService } from '../book.service';
export interface DialogData {
  email: string;
}

export interface DialogUpdateDate {
  BookTitle: string;
  Author: string;
  BookId: string;
  Category: CategoryEnum;
  Location: string;
  Availability: number;
}

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  pagetitle = 'Romance Novel';
  pageEvent: PageEvent;
  checkout_email: string;

  title: string;
  author: string;
  id: string;
  category: CategoryEnum;
  location: string;
  availability: number;

  constructor(
    public dialog: MatDialog,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private _bookService: BookService,
    private router: Router,
    location: Location
  ) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
          this.router.navigated = false;
          window.scrollTo(0, 0);
      }
  });
  }

  ngOnInit(): void {
    this.selectParam();
  }
  selectParam() {
    let param = this.route.snapshot.paramMap.get('id');
    if (param === null || param === '') {
      param = 'r_n';
      this.pagetitle = 'Romance Novel';
    }if (param === 'r_n') {
      this.pagetitle = 'Romance novel';
    } else if (param === 'h_f') {
      this.pagetitle = 'Horror fiction';
    } else if (param === 'f') {
      this.pagetitle = 'Fantasy';
    } else if (param === 's_f') {
      this.pagetitle = 'Science fiction';
    }
    this._bookService.getBooks(param);
  }
  remove (data) {
    this._authService.removeBook({isbn: 0 + data});
  }

  openDialog(isbn): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { email: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.checkout({isbn: isbn, email: result});
    });
  }
  checkout(data) {
    console.log('isbn', data.email);
    this._authService.makeIssue(data);
  }
  openDialog1(): void {
    const dialogRef1 = this.dialog.open(DialogUpdateComponent, {
      width: '250px',
      data: {
        title: this.title,
        author: this.author,
        id: this.id,
        category: this.category,
        location: this.location,
        availability: this.availability
      }
    });

    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog 1 was closed');
      this.title = result;
    });
  }
}
@Component({
  selector: 'app-dialog',
  template: `
  <div >
    <h1 mat-dialog-title>Checkout</h1>
      <div mat-dialog-content *ngIf="!_authService.isAuthenticated">
        <p>Enter your email id to checkout!</p>
        <mat-form-field>
          <input matInput [(ngModel)]="data.email">
        </mat-form-field>
      </div>
      <div mat-dialog-content *ngIf="_authService.isAuthenticated">
        <p>Checkout using <br> {{_authService.Email}} ?</p>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">No Thanks</button>
        <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
      </div>
</div>`,
})
export class DialogComponent {

  constructor(
    private _authService: AuthService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-dialog',
  template: `
  <div >
    <h1 mat-dialog-title>Checkout</h1>
      <div mat-dialog-content>
        <mat-form-field>
        <input matInput [(ngModel)]="data.title" placeholder="book title"><br>
        <input matInput [(ngModel)]="data.author" placeholder="Author"><br>
        <input matInput [(ngModel)]="data.id" placeholder="Book Id"><br>
        <input matInput [(ngModel)]="data.category" placeholder="Category"><br>
        <input matInput [(ngModel)]="data.location" placeholder="Location"><br>
        <input matInput [(ngModel)]="data.availability" placeholder="Avalability"><br>
      </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">No Thanks</button>
        <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
      </div>
</div>`,
})
export class DialogUpdateComponent {

  constructor(
    private _authService: AuthService,
    public dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogUpdateDate) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
