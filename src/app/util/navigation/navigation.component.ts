import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  opened: boolean;
  private media: string;
  @ViewChild('drawer') sideNav: MatSidenav;
  constructor(private _media$: ObservableMedia) { }

  ngOnInit() {
    this.sideNav.close();
    this._media$.asObservable().subscribe((m: MediaChange) => {
      this.media = m.mqAlias;
    });
  }
  onResize(event) {
    if (this.media === 'xs' || this.media === 'sm') {
      this.sideNav.close();
    }
  }

}
