import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {Category} from '../services/category';
import {SearchService} from '../services/search.service';
import {Router} from '@angular/router';

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
  _search = '';
  title = "Cuddly(tm)";

  constructor(
    protected authService: AuthService,
    private categoryService: CategoryService,
    private searchService: SearchService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getUser();
    this.categories = this.categoryService.getCategories();
    this.categories.subscribe(list => {
      this.categoriesList = list;
    });
  }

  /**
   *
   */
  protected onSearch() {
    this.searchService.changeSearch(this._search);
  }

  getUser() {
    this.authService.getUser().subscribe(
      result => {
        this.isLoggedIn = result !== null;
        console.log(result);
        if (result) {
          this.user = result;
        }
      });
  }

  protected isloggined() {
    return this.isLoggedIn;
  }

}
