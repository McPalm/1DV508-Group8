import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs/observable';
import { Category } from '../services/category';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  categories: Observable<Category[]>;
  categoryArray: Category[];
  model = "";
  admin = true; // For when we got this functionally up and running
  category: Category;

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.categories.subscribe(blarg => this.categoryArray = blarg);
  }
  
  onChange(value) {
    for(let c of this.categoryArray)
      if(c.name == value)
        this.category = c;
  }
}
