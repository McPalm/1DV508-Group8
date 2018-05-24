import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {Category} from '../services/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  categories: Observable<Category[]>;
  categoriesList: Category[];
  whereto = 'nav';

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
    });
  }
}
