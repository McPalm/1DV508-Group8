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
  // Returns true if user is logged in else navigates to '/'
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user
           .take(1)
           .map(user => !!user)
           .do(loggedIn => {
             if (!loggedIn) {
               console.log('access denied')
               this.router.navigate(['/']);
             }
         });

  }
}
