import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Item } from '../services/item';
import { Order } from '../services/order';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-order-catalog',
  templateUrl: './order-catalog.component.html',
  styleUrls: ['./order-catalog.component.css']
})
export class OrderCatalogComponent implements OnInit {

  
  // cart : CartEntry[];

  orders : Array<Order>
  order : Order;
  totalPrice : number;
  userName : string;

  // orderss : Observable<Order[]>;

  constructor(private orderService : OrderService) { }

  ngOnInit() {
    this.orders = this.orderService.getOrders();
    this.orderService.getObservable().subscribe( a => {
      this.orders = a;
    });
    // this.changeActive(this.orders[0]);

  }

  changeActive(order : Order) {
    this.order = order;
    this.totalPrice = this.totalPriceOf(this.order);
  }


  acceptOrder() {
    console.log("Yay, we accept the order!");
    // TODO, basically everything related to actually confirming the order
  }

  rejectOrder() {
    console.log("We rejected the order! :<")
    // TODO, you know
  }

  totalPriceOf(order: Order) : number {
    let sum = 0;
    for(let entry of order.cart)
      sum += entry.item.price * entry.count;
  
    return sum;
  }
  
}

