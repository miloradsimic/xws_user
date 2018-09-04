import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginServiceService } from './services/login-service.service';
import { User } from './domain/user';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'XwsUser';

  loggedUser: User;

  public constructor(private loginService: LoginServiceService, private router: Router) {
    this.loggedUser = null;
  }

  ngOnInit(): void {
    let component = this;
    this.handleLogin();
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        const navigationEndEvent = event as NavigationEnd;
        if(navigationEndEvent.urlAfterRedirects === "/main") {
          component.handleLogin();
        }
      }
    });
  }

  handleLogin() {
    if(this.loginService.isLoggedIn()) {
      this.loggedUser = this.loginService.getLoggedUser();
    } 
    else {
      this.loggedUser = null;
    }
  }

  public logout() {
    this.loginService.logout();
    this.handleLogin();
  }

}
