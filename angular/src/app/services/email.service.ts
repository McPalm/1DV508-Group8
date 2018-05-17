import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailService {
	
	private user;
	endpoint = 'https://us-central1-fuck-6c7c8.cloudfunctions.net/httpEmail';
	
  constructor(private db: AngularFireDatabase, private CookieService: CookieService, private http: HttpClient) {
	this.user = this.CookieService.get('UID');
  }
  
  sendEmail() {
	  
	  let info;
	  let email;
	  let name;
	  let orderid = "tmp";
	  
	  let dbRef = this.db.object(`users/${this.user}`).valueChanges().subscribe((value) => {
		   
		   info = value;
		   email = info.email;
		   name = info.displayName;
		   
			
		     const data = {
				toEmail: email,
				toName: name,
				toOrder: 'Randomnummer5',
			}
		    
			
			 this.http.post(this.endpoint, data).subscribe()
			 
			 dbRef.unsubscribe();
	  });


  }
  

}
