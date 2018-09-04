import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot,
   RouterStateSnapshot, CanActivate, 
   CanActivateChild } from '@angular/router';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginServiceService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.loginService.attemptedUrl = state.url;
    let loggedIn = this.loginService.isLoggedIn();
    if(!loggedIn) {
      this.router.navigate(['/login']);
    }
    return loggedIn;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.loginService.attemptedUrl = state.url;
    let loggedIn = this.loginService.isLoggedIn();
    if(!loggedIn) {
      this.router.navigate(['/login']);
    }
    return loggedIn;
  }

}
