import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

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
  /*  TODO add later */
  //privacy : Privacy;
  //privilege : Privilege;
}

@Injectable()
export class AuthService {

  public user;
  public userReference;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {

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


    const today = new Date();
    const data: User = {
      uid: user.uid,
      email: user.email,
      lastActive : today.toString(),
      displayName: user.displayName,
    }
    return userRef.set(data);
  }

   getUser(): Observable<User> {
    let userAuth = this.afAuth.authState
    .switchMap(userAuth => {
      if (userAuth) {
        return this.db.object(`users/${userAuth.uid}`).valueChanges()
  }
    })
    return Observable.of(null)
}

// Signs out the user
  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
        window.location.reload();
    });
  }
}
