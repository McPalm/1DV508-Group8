import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../services/category.service';
import { Category } from '../services/category';

@Component({
  selector: 'app-frontpage ngbd-dropdown-basic',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
})
export class FrontpageComponent implements OnInit {
  user;
  categories: Observable<Category[]>;
  categoriesList: Category[];
  whereto = "nav";

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService
  ) { }

  getUser() {
    this.authService.getUser().subscribe(res => this.user = res);
  }

  ngOnInit() {
    this.getUser();
    this.categories = this.categoryService.getCategories();
      this.categories.subscribe(list => {
        this.categoriesList = list;
    })
  }
}
