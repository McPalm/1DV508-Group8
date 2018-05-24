import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Adress } from './adress';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';

@Injectable()
export class AdressService {
  
  private user : string;
  private obs : Observable<any[]>
  private eventStream = new Subject<any[]>();

  constructor(private db : AngularFireDatabase, private auth : AuthService)
  {
    auth.getUser().subscribe(u => {
      this.user = u.uid,
      this.db.list(`users/${this.user}/addresses`).valueChanges().subscribe( list => {
        this.eventStream.next(list);
      });
    });
  }

  /**
   * Get all the adresses registered on my account
   */
  public getAdresses() : Observable<any[]> {
    return this.eventStream;
    //if(this.user == null)
    //  return this.obs;
    // return this.db.list(`users/${this.user}/addresses`).valueChanges();
  }

  public addAdress(adress: Adress) {
    if(adress.uid == null)
      adress.uid = this.db.database.ref().push().key
    const ref = this.db.database.ref(`users/${this.user}/addresses`);
    ref.child(adress.uid).set(adress);
  }

  public deleteAdress(adress: Adress) {
    var ref = this.db.database.ref().child(`users/${this.user}/addresses/${adress.uid}`);
    ref.remove();
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
