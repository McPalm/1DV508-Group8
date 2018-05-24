import { Component, OnInit } from '@angular/core';
import { Adress } from '../services/adress';
import { AdressService } from '../services/adress.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private adrs : AdressService) { }

  adresses : Observable<Adress[]>;

  a1 = "";
  a2 = "";
  zip: number;
  city = "";

  ngOnInit() {
    this.adresses = this.adrs.getAdresses();
  }

  onSubmit()
  {
    let adress : Adress = 
    {
      address1: this.a1.trim(),
      zip: this.zip,
      city: this.city.trim(),
    }
    if(this.a2.trim().length > 0)
      adress.address2 = this.a2.trim();
    this.adrs.addAdress(adress);
  }

  onDelete(adress : Adress) {
    if(confirm("Are you sure to delete " + adress.address1)) {
      this.adrs.deleteAdress(adress);
    }
  }
}
