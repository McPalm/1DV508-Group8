import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../services/user';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  user;

  constructor(public auth: AuthService, private userService: UserService) { }

  getUser() {
    this.user = this.auth.getUser().subscribe()
  }

  ngOnInit() {
    this.getUser();
  }

  logout() : void {
    //this.user.name = "";
  }
}
