import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule, MatButtonModule,
  MatIconModule, MatToolbarModule, MatListModule,
  MatCheckboxModule, MatFormFieldModule, MatInputModule,
  MatCardModule, MatGridListModule, MatPaginatorModule, MatDialogModule,
  MatTableModule, MatRadioModule, MatSelectModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './util/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowseComponent, DialogComponent } from './browse/browse.component';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './authInterceptor.service';
import { IssueHistoryComponent } from './issue-history/issue-history.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { RegisterBookComponent } from './register-book/register-book.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLogin } from './auth.guard.login';
import { BookService } from './book.service';
import { MessageComponent } from './message/message.component';
import { SnackbarComponent } from './message/message-snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NavigationService } from './util/navigation/navigation.service';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    BrowseComponent,
    IssueHistoryComponent,
    DialogComponent,
    AccountDetailsComponent,
    RegisterBookComponent,
    MessageComponent,
    SnackbarComponent
  ],
  imports: [
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule
  ],
  entryComponents: [
    DialogComponent,
    SnackbarComponent
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, AuthGuard, AuthGuardLogin,
  BookService,
  NavigationService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
