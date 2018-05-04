import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { Category } from '../services/category';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

	constructor(
		private categoryService : CategoryService,
		private itemService : ItemService,
	) { }

	model = new Item();

  categories: Observable<Category[]>;
  items: Observable<Item[]>;
  selectedProduct: Item;

	onSubmit() {
		this.itemService.updateItem(this.model);
		this.model = new Item();
	}

	ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.items = this.itemService.getItemsAll();
  }
  
  selectProduct() {
    this.model.name = this.selectedProduct.name;
    this.model.price = this.selectedProduct.price;
    this.model.category = this.selectedProduct.category;
    this.model.description = this.selectedProduct.description;
    this.model.uid = this.selectedProduct.uid;
    this.model.count = this.selectedProduct.count;
  }
}

