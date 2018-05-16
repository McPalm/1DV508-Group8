import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Item } from '../services/item';

@Component({
  selector: 'app-order-catalog',
  templateUrl: './order-catalog.component.html',
  styleUrls: ['./order-catalog.component.css']
})
export class OrderCatalogComponent implements OnInit {

  
  // cart : CartEntry[];
  activeOrders : Array<Order>;
  order : Order;
  totalPrice : number;

  constructor() { }

  ngOnInit() {
    this.buildMock();
    this.changeActive(this.activeOrders[0]);
  }

  changeActive(order : Order) {
    this.order = order;
    this.totalPrice = this.totalPriceOf(this.order);
  }

  buildMock()
  {
    this.activeOrders = new Array<Order>();
    this.activeOrders.push(
      {
        user: "Jon",
        cart: this.mockOrder()
      }
    );
    this.activeOrders.push(
      {
        user: "Alice",
        cart: this.mockOrder()
      }
    );
    this.activeOrders.push(
      {
        user: "Sune",
        cart: this.mockOrder()
      }
    );
    this.activeOrders[1].cart[2].count = 2;
    this.activeOrders[1].cart[0].item.name = "Fruit";
  }

  acceptOrder() {
    console.log("Yay, we accept the order!");
    this.order = this.activeOrders[1];
    // TODO, basically everything related to actually confirming the order
  }

  rejectOrder() {
    console.log("We rejected the order! :<")
    // TODO, you know
  }

  mockOrder() : Array<CartEntry> {
    return [
      
      {
        item: {
          name: "Banana",
          category: 1,
          count: 5,
          description: " ",
          keyword: "No",
          path: "",
          price: 50,
          uid: "No",
          rateHigh : [],
          rateLow: [],
        }, 
        count : 5,
      }, 
      
      {
        item: {
          name: "Apple",
          category: 1,
          count: 5,
          description: " ",
          keyword: "No",
          path: "",
          price: 50,
          uid: "No",
          rateHigh : [],
          rateLow: [],
        }, 
        count : 10,
      }, 
  
      {
        item: {
          name: "Orange",
          category: 1,
          count: 5,
          description: " ",
          keyword: "No",
          path: "",
          price: 50,
          uid: "No",
          rateHigh : [],
          rateLow: [],
        }, 
        count : 0,
      }, 
  
      {
        item: {
          name: "Pineapple",
          category: 1,
          count: 5,
          description: " ",
          keyword: "No",
          path: "",
          price: 50,
          uid: "No",
          rateHigh : [],
          rateLow: [],
        }, 
        count : 1,
      }, 
    ];
  }

  totalPriceOf(order: Order) : number {
    let sum = 0;
    for(let entry of order.cart)
      sum += entry.item.price * entry.count;
  
    return sum;
  }
  
}



//
// temporary Cart class untill we get a proper one added to the project
//
class CartEntry
{
  item: Item;
  count: number;
}

class Order
{
  user: string; // should be the person who actually put the order
  cart: Array<CartEntry>;
}


