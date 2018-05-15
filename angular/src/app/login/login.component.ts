import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;

  constructor(
    private location: Location,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  login(): void {
    this.user.name = 'Mario';
    this.location.back(); // this sends the user back to the page before they navigated to the login screen
  }

  getUser(): void {
    this.user = this.auth.getUser();
  }
}
