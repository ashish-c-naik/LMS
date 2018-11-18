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
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!this.authService.isAuthenticated) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/browse', 'mat']);
    return false;
  }
}
