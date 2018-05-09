import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Item } from './item';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CartService {
  private user;
  private cart;

  constructor(private db: AngularFireDatabase, private CookieService: CookieService) {
    this.user = this.CookieService.get('UID');
    this.db.list(`users/${this.user}/cart`).valueChanges().subscribe(cartRef => {
      this.cart = cartRef;
    })
  }

  // Returns cart list observable
  getCart(): Observable<{}[]> {
    return this.db.list(`users/${this.user}/cart`).valueChanges();
  }

  // Adds the item to the cart
  addItem(itemUID: string): void {
    if (this.user) {
      let item;
      let newAmount = 0;
      let dbRef = this.db.object(`users/${this.user}/cart/${itemUID}`).valueChanges().subscribe(itemRef => {
        item = itemRef;
        if (item) {
          newAmount = item.count;
        }
        let data = {
          id: itemUID,
          count: newAmount + 1,
        }
        this.db.object(`users/${this.user}/cart/${itemUID}`).update(data);
        dbRef.unsubscribe();
      })
    }
  }

  // Updates the item count 
  updateCount(itemUID: string, newCount: number): void {
    if (this.user) {
      this.db.object(`users/${this.user}/cart/${itemUID}`).update({ count: newCount });
    }
  }

  // Removes item from the cart 
  removeItem(itemUID: string): void {
    if (this.user) {
      this.db.object(`users/${this.user}/cart/${itemUID}`).remove();
    }
  }
}
