import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
	isVisible: boolean = false;
	constructor() { }

	ngOnInit() {
	}

	toggleVisible() {
	  this.isVisible = !this.isVisible;
	}

	addProduct() {
		this.toggleVisible();
	}
}
