import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Item } from '../services/item';
import { Order } from '../services/order';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs/Observable';
import { EmailService } from '../services/email.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CookieService } from 'ngx-cookie-service';

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
  reason : string;

  // orderss : Observable<Order[]>;

  constructor(private orderService : OrderService, private es: EmailService, private db: AngularFireDatabase, private CookieService: CookieService) { }

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
	
	let userID = this.order.userid
	let UID = this.order.uid;
	
	let dbRef = this.db.object(`users/${userID}/email`).valueChanges().subscribe((value) => {
	
	
	
	const data = {
		toReason : this.reason,
		toOrder : this.order.ordernumber,
		toAdress : this.order.address1,
		toName : this.order.name,
		toEmail : value,
		
	}
	
	
	this.es.accEmail(data);
	
	let opt = 'accepted';
	this.adminMail(opt, this.order.ordernumber);
	
	this.db.object(`orders/${UID}`).remove();
	
	this.changeActive(this.order[0])
	
	dbRef.unsubscribe();
	
	});
	
	
	
	
	
  }

  rejectOrder() {
    console.log("We rejected the order! :<")
    // TODO, you know
	
	let userID = this.order.userid;
	let UID = this.order.uid;
	
	let dbRef = this.db.object(`users/${userID}/email`).valueChanges().subscribe((value) => {
	
	
	
	const data = {
		toReason : this.reason,
		toOrder : this.order.ordernumber,
		toName : this.order.name,
		toEmail : value,
		
	}
	
	
	this.es.rejectEmail(data);
	
	let opt = 'rejected';
	
	this.adminMail(opt, this.order.ordernumber);
	
	
	this.db.object(`orders/${UID}`).remove();
	
	this.changeActive(this.order[0]);
	
	
	
	 dbRef.unsubscribe();
	});
	
	

  }

  totalPriceOf(order: Order) : number {
    let sum = 0;
    for(let entry of order.cart)
      sum += entry.item.price * entry.count;
  
    return sum;
  }
  
  
  adminMail(opt , orderid) {
	  
	  
	  
	  
	  let userID = this.CookieService.get('UID');
	  
	  
	  
	  let dbRef = this.db.object(`users/${userID}/email`).valueChanges().subscribe((value) => {
		  
		  
		let data = {
			toEmail : value,
			toSubject : 'Order ID: ' + orderid,
			toText : 'Order with Order ID ' + orderid + 'has been ' + opt + ' please proceed accordingly',
			
		}

		this.es.sendCustomEmail(data);
		
		dbRef.unsubscribe();
	  });
	  
  }
  
  
  
}
