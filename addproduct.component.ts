import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { Category } from '../services/category';
import { Observable } from 'rxjs/observable';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
	isVisible: boolean = false;
	isAdmin: boolean = false;
	constructor(
		private categoryService : CategoryService,
		private itemService : ItemService,
		private cookieService: CookieService, 
		private db: AngularFireDatabase,
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
		
		const UID: string = this.cookieService.get('UID');
	    this.db.object(`users/` + UID + `/admin`).valueChanges().subscribe((value) => {
	    if(value === 'true'){
		this.adminTrue(); 
	 }});	
	}
	
	
	adminTrue() {
		this.isAdmin = true;
	}

	toggleVisible() {
	  this.isVisible = !this.isVisible;
	}

	addProduct() {
		this.toggleVisible();
	}
}
