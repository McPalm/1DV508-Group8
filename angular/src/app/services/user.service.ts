import { Injectable } from '@angular/core';
import { User }       from './user';

@Injectable()
export class UserService {

  user: User = {
    name:''
  };

  constructor() { }

  getUser() : User {
    return this.user;
  }

}
