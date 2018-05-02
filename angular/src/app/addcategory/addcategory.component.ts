import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../services/category';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  categoryExists: boolean = false;
  categories: Observable<Category[]>;
  categoriesList: Category[];

  model = new Category();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
      this.categories = this.categoryService.getCategories();
      this.categories.subscribe(list => {
      this.categoriesList = list;
    });
  }

  onSubmit() {
    this.addCategory(this.model.name, this.model.description);
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
