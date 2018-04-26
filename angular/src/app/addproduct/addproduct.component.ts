import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
	isVisible: boolean = false;
	constructor() { }

	model = new Item();

	categories = ["Guns", "Electronics", "Mugs", "Garbage", "Pets"]; // for testing, need to sync with available categories later

	submitted = false;

	onSubmit() { this.submitted = true; console.log("submit"); }

	ngOnInit() {
	}

	toggleVisible() {
	  this.isVisible = !this.isVisible;
	}

	addProduct() {
		this.toggleVisible();
	}

	addItem()
	{
		console.log(this.model);
	}
}
