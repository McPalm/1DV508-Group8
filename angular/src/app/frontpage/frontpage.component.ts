import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  user: User;
  
  constructor(private userService: UserService) { }

  getUser(): void {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.getUser();
  }

  logout() : void {
    this.user.name = "";
  }

}
