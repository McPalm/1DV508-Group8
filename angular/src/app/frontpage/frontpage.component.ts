import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {CategoryService} from '../services/category.service';
import {ItemService} from '../services/item.service';
import {ItemCarousel} from '../item-carousel/ItemCarousel';
import { Item } from '../services/item';

@Component({
  selector: 'app-frontpage ngbd-dropdown-basic',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
})
export class FrontpageComponent implements OnInit {
  _items: ItemCarousel = new ItemCarousel();
  _newItems : Item[];

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private itemService: ItemService
  ) {
  }

  ngOnInit() {

    this.itemService.getHighlightedItems().subscribe(items => {
      /*  */
      const elements: ItemCarousel = {
        items: items,
        type: ''
      };

      this._items = elements;
    });

    this.itemService.getRecentItems(6).subscribe(i => this._newItems = i);
  }
}
