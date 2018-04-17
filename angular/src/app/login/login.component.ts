import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  login(): void {
    this.user.name = 'Mario';
    this.location.back(); // this sends the user back to the page before they navigated to the login screen
  }

  getUser(): void {
    this.user = this.userService.getUser();
  }
}
