import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Adress } from './adress';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';

@Injectable()
export class AdressService {
  
  private user : string;

  constructor(private db : AngularFireDatabase, private auth : AuthService)
  {
    auth.getUser().subscribe(u => this.user = u.uid);
  }

  /**
   * Get all the adresses registered on my account
   */
  public getAdresses() : Observable<Adress[]> {

    let temp = Observable.create( (observer) =>
    {
      observer.next(this.getMock())    
    });
    return temp;
  }

  public addAdress(adress: Adress) {
    if(adress.uid == null)
      adress.uid = this.db.database.ref().push().key
    const ref = this.db.database.ref(`users/${this.user}/addresses`);
    ref.child(adress.uid).set(adress);
  }

  public deleteAdress(adress: Adress) {
    
  }

  getMock() : Adress[] {
    return [
      {
        address1: "Jönsgatan 20",
        zip: 12345,
        city: "Stadby"
      },
      {
        address1: "Piano Gränd 14",
        address2: "lgh 1049",
        zip: 94120,
        city: "Testholm",
      }
    ]
  }
}
