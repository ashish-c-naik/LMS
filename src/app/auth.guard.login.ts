import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardLogin implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.authService.isAuthenticated) {
        return true;
      } else {
        if (localStorage.getItem('admin')) {
          this.router.navigate(['issue_history']);
        } else {
          this.router.navigate(['browse']);
        }
        return false;
      }
  }
}
