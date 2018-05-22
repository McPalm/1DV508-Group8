import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent implements OnInit {

  item;

  constructor(private nav: NavComponent) { }

  ngOnInit() {
	  this.item = this.nav.getSelectedItem();
  }

}
