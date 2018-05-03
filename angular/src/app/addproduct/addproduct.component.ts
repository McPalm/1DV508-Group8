import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { Category } from '../services/category';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

	constructor(
		private categoryService : CategoryService,
		private itemService : ItemService,
	) { }

	model = new Item();

	categories: Observable<Category[]>;

	submitted = false;

	onSubmit() {
		this.itemService.addItem(this.model);
		this.model = new Item();
	}

	ngOnInit() {
		this.categories = this.categoryService.getCategories();
	}


	addProduct() {

	}
}
