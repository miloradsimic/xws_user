import { Component, OnInit } from '@angular/core';
// import { LoginServiceService } from '../services/login-service.service';
import { LoginCredentials } from '../../domain/login-credentials';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials: LoginCredentials

  constructor( private loginService: LoginServiceService, private router: Router) { }

  ngOnInit() {
    this.loginCredentials = {
      email: "",
      password: ""
    }
  }

  public login() {
    let component = this;
    this.loginService.login(this.loginCredentials).subscribe((loggedState) => {
      if(component.loginService.attemptedUrl) {
        component.router.navigate([component.loginService.attemptedUrl]);
      } else {
        component.router.navigate(["/"]);
      }
    }, (error) => {
      alert("Login error! Server response: " + JSON.stringify(error));
    });
  }

}
