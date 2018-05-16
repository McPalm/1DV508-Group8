import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Item } from './item';
import { AuthService } from '../core/auth.service';
import { CartEntry } from './cart-entry';

@Injectable()
export class CartService {
  private user;
  private cart;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.auth.getUser().subscribe(res => this.user = res.uid);
    this.db.list(`users/${this.user}/cart`).valueChanges().subscribe(cartRef => {
      this.cart = cartRef;
    })
  }

  // Returns cart list observable
  getCart(): Observable<{}[]> {
    return this.db.list(`users/${this.user}/cart`).valueChanges();
  }

  // Adds the item to the cart
  addItem(product : Item): void {
    if (this.user) {
      let newAmount = 0;
      let item;
      let dbRef = this.db.object(`users/${this.user}/cart/${product.uid}`).valueChanges().subscribe(itemRef => {
        item = itemRef;
        if (item) {
          newAmount = item.count;
        }
        let data : CartEntry = {
          item: product,
          count: newAmount + 1,
        }
        this.db.object(`users/${this.user}/cart/${product.uid}`).update(data);
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
