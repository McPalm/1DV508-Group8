import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CookieService } from 'ngx-cookie-service';
import { EmailService } from '../services/email.service';
import {FirebaseApp} from 'angularfire2';
import { CartEntry } from '../services/cart-entry'
import { Item } from '../services/item';
import { OrderService } from '../services/order.service';




@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
	
  private name;
  items$: Observable<any[]>;
  private user;
  private items = false;
  orders : Array<CartEntry>
  sum = 0;
  itemCount = 0;
  private orders$
  
  constructor(private db: AngularFireDatabase, private CookieService: CookieService, private cs: EmailService, private firebase: FirebaseApp,
  private orderService : OrderService,) { 
	this.user = this.CookieService.get('UID');
	
	this.orders$ = this.db.list(`orders`);
	
	this.items$ = this.db.list(`users/${this.user}/cart`).valueChanges();
	this.db.object(`users/${this.user}/cart`).valueChanges().subscribe((value) => { 
		if(value) { this.items = true;} 
		else{ this.items = false;}
	});
	
  }

  ngOnInit() {

  let data;
  this.db.list(`users/${this.user}/cart`).valueChanges().subscribe( (value : Array<CartEntry>)  => {
	  
	  data = value;
	  
	  
	  this.orders = data;
	   
	  this.sum = 0;
	  this.itemCount = 0;
	  
	  for(let data of this.orders){
		this.sum += data.item.price * data.count;
		this.itemCount += data.count;
	  }

	  
	  
    });
	
	this.db.object(`users/${this.user}`).valueChanges().subscribe((value) => {
		
		data = value;
		this.name = data.displayName;
		
	});
	

  }
  
  countDown(id) {
	  
	  let change = 0;
	  let data;
	  let itemAmount = 0;
	  
	  let dbRef = this.db.object(`users/${this.user}/cart/${id}`).valueChanges().subscribe((value) => {
		   
		    data = value;
		    change = data.count;
			if(change > 0){
			change -= 1;
			
			
			let dbRef3 = this.db.object(`users/${this.user}`).valueChanges().subscribe(value3 => {
			
			data = value3;
		
			if(data.itemcount) {itemAmount = data.itemcount;}
				
			if(itemAmount > 0){itemAmount -=1;}
				
			this.db.object(`users/${this.user}/cart/${id}`).update({ count: change })
			this.db.object(`users/${this.user}`).update({ itemcount: itemAmount})
			
			dbRef3.unsubscribe();
			dbRef.unsubscribe();
		
	 });
			
} else {
	dbRef.unsubscribe();
	
}
});
  }
  
    countUp(id) {
			
		  	
		  let change = 0;
		  let data;
		  let tmp = 0;
		  let itemAmount = 0;
	
		  let dbRef = this.db.object(`users/${this.user}/cart/${id}`).valueChanges().subscribe((value) => {
			  
			 data = value;
			 change = data.count;
			  
		 let dbRef2 = this.db.object(`items/${id}`).valueChanges().subscribe((value2) => { 
			
			data = value2;
			tmp = data.count
			

			
			if(change < tmp){ 
			
			change +=1
			let dbRef3 = this.db.object(`users/${this.user}`).valueChanges().subscribe(value3 => {
			
				data = value3;
		
				if(data.itemcount) {
				itemAmount = data.itemcount;	
				}
		
				itemAmount +=1;
		
		
				this.db.object(`users/${this.user}`).update({ itemcount: itemAmount})
				this.db.object(`users/${this.user}/cart/${id}`).update({ count: change })
		
				dbRef3.unsubscribe();
				dbRef2.unsubscribe();
				dbRef.unsubscribe();
				})	  
			
			}
			
			else {
				alert('out of stock');
				dbRef2.unsubscribe();
				dbRef.unsubscribe();	
			}
		  
		});
				
	
 });
	
  }
  
  deleteItem(id) {

	
	let change = 0;
	let data;
	let itemAmount = 0;
	let tmp = 0;
	
	let dbRef = this.db.object(`users/${this.user}/cart/${id}`).valueChanges().subscribe((value) => { 
		data = value;
  
		tmp = data.count;
		
		let dbRef2 = this.db.object(`users/${this.user}`).valueChanges().subscribe(value2 => {
			
				data = value2;
		
				if(data.itemcount) {
				itemAmount = data.itemcount;	
				}

				
				if(itemAmount >= tmp){
				itemAmount -= tmp;
				}
				else {
				itemAmount = 0;
				}
		
				this.db.object(`users/${this.user}`).update({ itemcount: itemAmount})		
				this.db.object(`users/${this.user}/cart/${id}`).remove();
				
		
				dbRef2.unsubscribe();
				dbRef.unsubscribe();
				})	  
  });
		
	
	  
  }
  
  checkOut() {
	  
	  
	  let currentTime = new Date();
	  
		let data = {
			name: this.name,
			adress1: "tmp",
			zip: 100,
			city: "test",
			cart: this.orders,
			userid: this.user,
			status: 0,
			time: currentTime.toString(),
			uid: this.db.database.ref(`orders`).push().key,
			
		  }
		  
		  
		this.checkStock();
		  
		this.db.database.ref(`orders/${data.uid}`).set(data)

		this.db.object(`users/${this.user}/cart/`).remove();
		this.db.object(`users/${this.user}`).update({ itemcount: 0});

	  
	}
	
	
	checkStock() {
		
	  let change = 0;
	  let uid;
	  let item;
	  let tmp = 0;
	  
	  for(let data of this.orders){
		  
		  
			change = data.count;
			uid = data.item.uid;
			
			this.removeStock(uid, change);
			
			
	  }
	  
	}
	  
	  
	  
	removeStock(id: string, change: number) {
		
		let tmp;
		let item;
		  
		  let dbRef = this.db.object(`items/${id}`).valueChanges().subscribe((value) => {

			item = value;
			
			tmp = item.count;
			
			tmp -= change;
			
			
			this.db.object(`items/${id}`).update({ count: tmp})
			
			
			dbRef.unsubscribe();
			});
		    
	  }
		
		
	


}