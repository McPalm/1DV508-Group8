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
    this.auth.getUser().subscribe(res => this.user = (res != null ) ? res.uid : null);
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
	  let itemAmount = 0;
      let dbRef = this.db.object(`users/${this.user}/cart/${product.uid}`).valueChanges().subscribe(itemRef => {
        item = itemRef;
        if (item) {
          newAmount = item.count;
        }
		
		let dbRef3 = this.db.object(`items/${product.uid}`).valueChanges().subscribe(itemRef3 => { 
		
		item = itemRef3;
		
		if (newAmount + 1 > item.count) {
			
			alert('Out of stock');
		}
		
		else {
		
		
        let data : CartEntry = {
          item: product,
          count: newAmount + 1,
        }
        this.db.object(`users/${this.user}/cart/${product.uid}`).update(data);
		let dbRef2 = this.db.object(`users/${this.user}`).valueChanges().subscribe(itemRef2 => {
			
		item = itemRef2;
		
		if(item.itemcount) {
			itemAmount = item.itemcount;	
		}
		
		itemAmount +=1;
		
		this.db.object(`users/${this.user}`).update({ itemcount: itemAmount})
	
			dbRef2.unsubscribe();
		});
		}
        
		dbRef3.unsubscribe();
      })
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
