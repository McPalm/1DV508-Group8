import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService} from './auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  // Returns true if user is admin in else navigates to '/front'
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user
           .take(1)
           .map(user => {
             if(!user) {
               return false;
             }
             return user.admin === 'true'
           })
           .do(admin => {
             if (!admin) {
               console.log('access denied')
               this.router.navigate(['/frontpage']);
             }
         });
  } 
}
