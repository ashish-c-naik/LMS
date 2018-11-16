import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { StatusKM } from './status.km';
import { generateStatusObject } from './status.km';

@Injectable({
  providedIn: 'root'
})

export class StatusService {
  // VARIABLES
  private StatusStream = new Subject<StatusKM>();

  statusStream$ = this.StatusStream.asObservable();

  constructor() { }
  displayStatus(message: string, type: string, timer: number = null): void {
    setTimeout(() => {
      // Handling user error
      type = type.toLowerCase();
      if (type !== 'danger' && type !== 'warning' && type !== 'success' && type !== 'info') {
        console.log('Error in the type of snackbar message.'
          + 'Check the call to displayStatus function of status.service.ts.'
          + '\nFour types of messages: 1) danger 2) warning 3) success 4) info');
        return;
      }
      if (message == null || message === '') {
        console.log('Error in the message passed to snackbar.'
          + 'Check the call to displayStatus function of status.service.ts');
        return;
      }
      this.StatusStream.next(generateStatusObject(message, type, timer));
    }, 0);
  }
}
