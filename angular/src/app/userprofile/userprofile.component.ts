import { Component, OnInit } from '@angular/core';
import { Adress } from '../services/adress';
import { AdressService } from '../services/adress.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private adrs : AdressService) { }

  adresses : Adress[];

  a1 = "";
  a2 = "";
  zip: number;
  city = "";

  ngOnInit() {
    this.adrs.getAdresses().subscribe(a => this.adresses = a);
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

      console.log(adress)
  }

  onDelete(adress : Adress) {
    if(confirm("Are you sure to delete " + adress.address1)) {
      console.log("Deleting adress");
      console.log(adress);
    }
  }
}
