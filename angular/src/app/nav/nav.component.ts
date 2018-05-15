import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../services/category';
import { AngularFireDatabase } from 'angularfire2/database';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  categories: Observable<Category[]>;
  categoryArray: Category[];
  model = "";

  admin = false; // temp fix
  category: Category;
  page = "";

  constructor(private categoryService : CategoryService ,
			private cookieService: CookieService, 
      private db: AngularFireDatabase,
    ) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.categories.subscribe(blarg => this.categoryArray = blarg);

	  const UID: string = this.cookieService.get('UID');
	  this.db.object(`users/` + UID + `/admin`).valueChanges().subscribe((value) => {
	    if(value === 'true'){
		    this.adminTrue(); 
      }
    });
  }

  onChange(value) {
    if(value == "admin")
    {
      this.openAdmin();
    }
    else
    {
      for(let c of this.categoryArray)
        if(c.name == value)
          this.category = c;
      this.page = "";
    }
  }

  openAdmin() {
    this.category = null;
    this.page = "admin";
  }
  
  openOrders() {
    this.category = null;
    this.page = "orders";
  }
  
	 adminTrue() {
		this.admin = true;
	}
  
}
