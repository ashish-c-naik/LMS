import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KASND';

  constructor (
    private themeService: ThemeService
  ) {}
}
