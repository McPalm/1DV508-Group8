import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CookieService } from 'ngx-cookie-service';
import { EmailService } from '../services/email.service';



@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
	
	
  items$: Observable<any[]>;
  private user;
  private items = false;

  constructor(private db: AngularFireDatabase, private CookieService: CookieService, private cs: EmailService) { 
  
	this.user = this.CookieService.get('UID');
	this.items$ = this.db.list(`users/${this.user}/cart`).valueChanges();
	this.db.object(`users/${this.user}/cart`).valueChanges().subscribe((value) => { 
		if(value) {
			this.items = true;
		}
	});
	
  }

  ngOnInit() {
	  
	  
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
		
			if(data.itemcount) {
				itemAmount = data.itemcount;	
				}
				
		
			itemAmount -=1;
				
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
	  
	//this.cs.sendEmail();
	
	
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
		
				itemAmount -= tmp;
		
		
				this.db.object(`users/${this.user}`).update({ itemcount: itemAmount})		
				this.db.object(`users/${this.user}/cart/${id}`).remove();
				
		
				dbRef2.unsubscribe();
				dbRef.unsubscribe();
				})	  
  });
		
	
	  
  }

}
