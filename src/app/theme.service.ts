import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
    switch = localStorage.getItem('theme') === 'true' || false;
    changeTheme () {
        this.switch = !this.switch;
    }
    saveTheme () {
        localStorage.setItem('theme', '' + this.switch);
    }
}
