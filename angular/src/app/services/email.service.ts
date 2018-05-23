import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailService {
	
	private user;
	endpoint = 'https://us-central1-fuck-6c7c8.cloudfunctions.net/httpEmail';
	endpoint2 = 'https://us-central1-fuck-6c7c8.cloudfunctions.net/httpEmailCustom';
	
  constructor(private db: AngularFireDatabase, private CookieService: CookieService, private http: HttpClient) {
	this.user = this.CookieService.get('UID');
  }
  
  sendEmail(oID) {
	  
	  let info;
	  let email;
	  let name;
	  let orderid = oID;
	  
	  let dbRef = this.db.object(`users/${this.user}`).valueChanges().subscribe((value) => {
		   
		   info = value;
		   email = info.email;
		   name = info.displayName;
		   
			
		     const data = {
				toEmail: email,
				toName: name,
				toOrder: orderid,
			}
		    
			
			 this.http.post(this.endpoint, data).subscribe()
			 
			 dbRef.unsubscribe();
	  });


  }
  
  
  //to send an costum email simply send the data to this function EG:
  
  //const data = {
			//toEmail :'email@anon.com',
			//toSubject : 'Put subject here',
			//toText : 'Put text here.',
			
		//}
		
  //this.EmailService.sendCustomEmail(data);			

	  
  
  sendCustomEmail(data) {
	  
	  this.http.post(this.endpoint2, data).subscribe()
  }

}
