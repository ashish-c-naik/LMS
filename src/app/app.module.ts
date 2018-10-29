import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule, MatButtonModule,
   MatIconModule, MatToolbarModule, MatListModule,
   MatCheckboxModule, MatFormFieldModule, MatInputModule,
   MatCardModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './util/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
  ],
  imports: [
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
