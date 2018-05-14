import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {CookieService} from 'ngx-cookie-service';

interface User {
  uid: string;
  email: string;
  lastActive : string;  /*  Is not needed if firebase will handle this. */

  /*  Is not required for every time user logins. */
  createDate ?: string;
  displayName?: string;
  telephone ?: string;
  firstName ?: string;
  lastName ?: string;
  city ?: string;
  postcode ?: number;
  admin : string;
  /*  TODO add later */
  //privacy : Privacy;
  //privilege : Privilege;
}

@Injectable()
export class AuthService {

  public user;
  public userReference;
  public admincheck;
  public cookieValue;
  public tempadmin: boolean;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router,
			  private cookieService: CookieService) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            this.userReference = this.user = db.object(`users/${user.uid}`).valueChanges();
            return  this.user = db.object(`users/${user.uid}`).valueChanges();
          } else {
            return Observable.of(null)
          }
        })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firedatabase on login
    const userRef  = this.db.object(`users/${user.uid}`);
	this.cookieService.set( 'UID', user.uid );
    this.cookieValue = this.cookieService.get('UID');
	this.db.object(`users/${user.uid}/admin`).valueChanges().subscribe((value) => {
		this.admincheck = value;
		var temp;
		if(this.admincheck === 'true'){ temp = 'true';}
		else {temp = 'false';}


	  const today = new Date();
	  const data: User = {
      uid: user.uid,
      email: user.email,
      lastActive : today.toString(),
      displayName: user.displayName,
	  admin: temp.toString(),
    }

	window.location.reload();
    return userRef.update(data);

	});



  }

  /**
   * Get current user. if not user is logged in, null
   * is returned.
   *
   * @returns {Observable<User>} | null
   */
  getUser(): Observable<User> {
    const authUser = this.afAuth.authState
      .switchMap(userAuth => {
        if (userAuth) {
          return this.db.object(`users/${userAuth.uid}`).valueChanges();
        }
        else {
          return Observable.of(null);
        }
      });
    return authUser;
  }

// Signs out the user
  signOut() {
	this.cookieService.deleteAll();
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
        window.location.reload();
    });
  }
}
