import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';
import { ItemService } from './item.service';
import { Order } from './order';

@Injectable()
export class OrderService {
  private user;
  private orders;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.auth.getUser().subscribe(res => this.user = (res != null ) ? res.uid : null );
    this.db.list(`orders`).valueChanges().subscribe( o => {
      this.orders = o;
    });

  }

   // Returns a list with all the orders
   getOrders() : Order[]  {
    return this.orders;
  }

  getObservable() : Observable<any[]> {
    return this.db.list(`orders`).valueChanges();
  }

  // Returns a list with all orders from specified user
  getUserOrders(userid : string) : Order[] {
    let userOrders = this.orders.filter(o => {
      return o.userid === userid;
    })
    return userOrders;
  }

  // Adds the order to the database, returns a promise resolving to true on success
  addOrder(order: Order) : Promise<boolean> {
    let data = order;
    let success : boolean = false;
      let currentTime = new Date();
      data.userid = this.user;
      data.status = 0;
      data.time = currentTime.toString();
      data.uid = this.db.database.ref(`orders`).push().key;
      
      return this.db.database.ref(`orders/${data.uid}`).set(data).then(resolve => {
        return true;
      }, reject => {
        return false;
      })
    }
}

