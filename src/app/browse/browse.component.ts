import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { AuthService } from '../auth.service';
import { Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryEnum } from '../category.enum';
import { ActivatedRoute, Router, NavigationStart, Params, NavigationEnd } from '@angular/router';
import { BookService } from '../book.service';
import { NavigationService } from '../util/navigation/navigation.service';
import { Validators, FormControl } from '@angular/forms';
import { StatusService } from '../message/status.service';
export interface DialogData {
  email: string;
}

export interface DialogUpdateDate {
  data;
}

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  pagetitle = 'Mathematics';
  pageEvent: PageEvent;
  checkout_email = localStorage.getItem('email');


  constructor(
    public dialog: MatDialog,
    public dialog1: MatDialog,
    public dialog2: MatDialog,
    public _authService: AuthService,
    public route: ActivatedRoute,
    public _bookService: BookService,
    public router: Router,
    public navigationService: NavigationService,
    public statusService: StatusService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.navigationService.showLogin = true;
    this.navigationService.showRegister = true;
    this.navigationService.showSearch = true;
    this.selectParam();
  }
  selectParam() {
    let param;
    this.route.params.subscribe(params => {
      param = params['id'] || 'mat';
    });
    if (param === 'mat') {
      this.pagetitle = 'Mathematics';
    } else if (param === 'sci') {
      this.pagetitle = 'Science';
    } else if (param === 'tec') {
      this.pagetitle = 'Technology';
    } else if (param === 'art') {
      this.pagetitle = 'Art';
    } else if (param === 'his') {
      this.pagetitle = 'History';
    } else if (param === 'hea') {
      this.pagetitle = 'Health';
    } else if (param === 'ent') {
      this.pagetitle = 'Entertainment';
    } else if (param === 'fic') {
      this.pagetitle = 'Fiction';
    } else if (param === 'mis') {
      this.pagetitle = 'Miscellaneous';
    }
    console.log(param);
    this._bookService.getBooks(param);
  }
  remove(data) {
    this._authService.removeBook({ isbn: 0 + data });
  }

  openDialog(isbn): void {
    this.checkout_email = localStorage.getItem('email');
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { email: this.checkout_email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === false || result === undefined) {
        this.statusService.displayStatus('Cancelled the operation', 'info');
      } else {
        this.checkout_email = result;
        this.checkout({ isbn: isbn, email: this.checkout_email });
      }
    });
  }
  checkout(data) {
    console.log('isbn', data.email);
    this._authService.makeIssue(data);
  }

  openDialog1(data): void {
    const dialogRef1 = this.dialog1.open(Dialog2Component, {
      width: '250px',
      data: {}
    });

    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === false || result === undefined) {
        this.statusService.displayStatus('Cancelled the operation', 'info');
      } else {
        this.remove(data);
      }
    });
  }

  openDialog2(data): void {
    console.log(data);
    const dialogRef2 = this.dialog2.open(DialogUpdateComponent, {
      width: '250px',
      data: { data: JSON.parse(JSON.stringify(data)) }
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === false || result === undefined) {
        this.statusService.displayStatus('Cancelled the operation', 'info');
      } else {
        // console.log(result);
        this._authService.updateBook(result.data);
      }
    });
  }
}
@Component({
  selector: 'app-dialog',
  template: `
  <div >
    <h1 mat-dialog-title>Checkout</h1>
      <div mat-dialog-content>
        <p>Enter your email id to checkout!</p>
        <mat-form-field>
          <input matInput [(ngModel)]="data.email" [disabled]="!_authService.isAuthenticated" [formControl]="email" required>
          <mat-error *ngIf="email.invalid">{{getErrorMessageEmail()}}</mat-error>
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="dialogRef.close(false)">Cancel</button>
        <button mat-button [disabled]="email.status !== 'VALID'" (click)="dialogRef.close(data.email)" cdkFocusInitial>Ok</button>
      </div>
</div>`,
})
export class DialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  constructor(
    public _authService: AuthService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

}



@Component({
  selector: 'app-second-dialog',
  template: `
  <div >
    <h1 mat-dialog-title>Delete</h1>
      <div mat-dialog-content>
        <p>Are you sure?</p>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="dialogRef1.close(false)">Cancel</button>
        <button mat-button (click)="dialogRef1.close(true)" cdkFocusInitial>Ok</button>
      </div>
</div>`,
})
export class Dialog2Component {
  constructor(
    public _authService: AuthService,
    public dialogRef1: MatDialogRef<Dialog2Component>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}

@Component({
  selector: 'app-dialog',
  template: `
  <div>
    <h1 mat-dialog-title>Update details <br> Book Id - {{data.data.isbn}}</h1>
      <div mat-dialog-content>
        <mat-form-field>
          <input matInput [(ngModel)]="data.data.title" placeholder="Book title" [formControl]="title" required>
          <mat-error *ngIf="title.invalid">{{getErrorMessageTitle()}}</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="data.data.author" placeholder="Author" [formControl]="author" required>
          <mat-error *ngIf="author.invalid">{{getErrorMessageAuthor()}}</mat-error>
        </mat-form-field>
        <!-- <mat-form-field hintLabel="Please enter only numbers">
        Book -{{data.data.isbn}}
        <input matInput [(ngModel)]="data.data.isbn" placeholder="Book Id" [formControl]="isbn" required>
          <mat-error *ngIf="isbn.invalid">{{getErrorMessageISBN()}}</mat-error>
        </mat-form-field> -->
        <mat-form-field>
          <mat-select placeholder="Select a category" name="category" [(ngModel)]="data.data.category" [formControl]="category" required>
            <mat-option value="mat">Mathematics</mat-option>
            <mat-option value="sci">Science</mat-option>
            <mat-option value="tec">Technology</mat-option>
            <mat-option value="art">Art</mat-option>
            <mat-option value="his">History</mat-option>
            <mat-option value="hea">Health</mat-option>
            <mat-option value="ent">Entertainment</mat-option>
            <mat-option value="fic">Fiction</mat-option>
            <mat-option value="mis">Miscellaneous</mat-option>
          </mat-select>
          <mat-error *ngIf="category.invalid">{{getErrorMessageCategory()}}</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-select placeholder="Select a location" name="location" [(ngModel)]="data.data.location" [formControl]="location" required>
            <mat-option value="1">1</mat-option>
            <mat-option value="2">2</mat-option>
            <mat-option value="3">3</mat-option>
            <mat-option value="4">4</mat-option>
            <mat-option value="5">5</mat-option>
            <mat-option value="6">6</mat-option>
            <mat-option value="7">7</mat-option>
            <mat-option value="8">8</mat-option>
            <mat-option value="9">9</mat-option>
            <mat-option value="10">10</mat-option>
          </mat-select>
          <mat-error *ngIf="location.invalid">{{getErrorMessageLocation()}}</mat-error>
        </mat-form-field>
        <mat-form-field hintLabel="Please enter only numbers">
          <input matInput [(ngModel)]="data.data.availability" placeholder="Avalability" [formControl]="availability" required>
          <mat-error *ngIf="availability.invalid">{{getErrorMessageAvailability()}}</mat-error>
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="dialogRef2.close(false)">Cancel</button>
        <button mat-button
        [disabled]="this.title.status !== 'VALID' ||
        this.author.status !== 'VALID' ||
        this.category.status !== 'VALID' ||
        this.location.status !== 'VALID' ||
        this.availability.status !== 'VALID'"
        (click)="dialogRef2.close(data)" cdkFocusInitial>Ok</button>
      </div>
</div>`,
  styles: [`
  mat-form-field {
  }
`]
})
export class DialogUpdateComponent {
  title = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  // isbn  = new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]);
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

  // getErrorMessageISBN() {
  //   return this.isbn.hasError('required') ? 'You must enter a value' :
  //   this.title.hasError('pattern') ? 'Invalid ISBN' :
  //       '';
  // }

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
    public dialogRef2: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogUpdateDate) {

  }

}
