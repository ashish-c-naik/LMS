
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { StatusService } from './status.service';
import { SnackbarComponent } from './message-snackbar.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(public snackBar: MatSnackBar, private _statusService: StatusService) {
    this.subscription = _statusService.statusStream$.subscribe(
      statuskm => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: statuskm.statusTimer,
          data: statuskm.statusMessage,
          panelClass: [statuskm.statusType],
        });
      });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

