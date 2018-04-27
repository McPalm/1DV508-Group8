import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { Category } from '../services/category';
import { Observable } from 'rxjs/observable';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
	isVisible: boolean = false;
	constructor(
		private categoryService : CategoryService,
		private itemService : ItemService,
	) { }

	model = new Item();

	categories: Observable<Category[]>;

	submitted = false;

	onSubmit() {
		this.isVisible = false;
		this.itemService.addItem(this.model);
		this.model = new Item();
	}

	ngOnInit() {
		this.categories = this.categoryService.getCategories();
	}

	toggleVisible() {
	  this.isVisible = !this.isVisible;
	}

	addProduct() {
		this.toggleVisible();
	}
}
