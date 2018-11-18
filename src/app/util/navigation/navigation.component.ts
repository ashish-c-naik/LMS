import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  type = 'type';
  showTitle = true;
  show = false;
  islogged = this.authService.isAuthenticated;
  opened: boolean;
  private media: string;
  @ViewChild('snav') sideNav: MatSidenav;
  constructor(
    private _media$: ObservableMedia,
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.sideNav.close();
    this._media$.asObservable().subscribe((m: MediaChange) => {
      this.media = m.mqAlias;
    });
  }
  onResize(event) {
    if (this.media === 'xs' || this.media === 'sm') {
      this.showTitle = false;
      this.sideNav.close();
    } else { this.showTitle = true; }
  }
}
