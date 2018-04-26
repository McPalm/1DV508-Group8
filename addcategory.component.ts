import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../services/category';
import { Observable } from 'rxjs/observable';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  isAdmin: boolean = false;
  isVisible: boolean = false;
  categoryExists: boolean = false;
  categories: Observable<Category[]>;
  categoriesList: Category[];

  constructor(private categoryService: CategoryService,
			  private cookieService: CookieService, 
		      private db: AngularFireDatabase,) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.categories.subscribe(list => {
      this.categoriesList = list;
    })
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

  addCategory(newCategory: string, newCategoryDesc: string) {
	  if(newCategory){
	      // Check if category already exists
	      for (let i = 0; i < this.categoriesList.length; i++) {
	        if (this.categoriesList[i].name == newCategory) {
	          this.categoryExists = true;
	          return;
	        }
	      }
	      this.categoryExists = false;
	      this.categoryService.addCategory(newCategory, newCategoryDesc)

	  }
  }
}
