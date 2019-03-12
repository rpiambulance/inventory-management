import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  // Checks to see if user's authentication token is expired if so redirects them
  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    const JwtService = new JwtHelperService();
    const expired = JwtService.isTokenExpired(token);
    if (expired) {
      localStorage.removeItem('auth_token');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
