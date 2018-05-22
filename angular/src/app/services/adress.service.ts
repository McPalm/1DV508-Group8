import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Adress } from './adress';

@Injectable()
export class AdressService {

  constructor() { }



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
