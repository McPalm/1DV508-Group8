import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {CategoryService} from '../services/category.service';
import {ItemService} from '../services/item.service';
import {ItemCarousel} from '../item-carousel/ItemCarousel';

@Component({
  selector: 'app-frontpage ngbd-dropdown-basic',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
})
export class FrontpageComponent implements OnInit {
  dailyitem: ItemCarousel = {};

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private itemService: ItemService
  ) {
  }

  ngOnInit() {
    this.itemService.getRecentItems(10).subscribe(items => {
      this.dailyitem.items = items;
      this.dailyitem.type = '';
      console.log(this.dailyitem);
    });
  }
}
