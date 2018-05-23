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

  ngOnInit() {
    this.adrs.getAdresses().subscribe(a => this.adresses = a);
  }

}
