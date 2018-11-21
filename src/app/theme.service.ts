import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
    switch = false;
    changeTheme () {
        this.switch = !this.switch;
    }
}
