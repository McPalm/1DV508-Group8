import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ItemService} from '../services/item.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Item} from '../services/item';
import {Category} from '../services/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  /*  For listening to search query.  */
  @Input() set search(value: string) {
    this.cacheSearch = value;
    this.resetPager();
    this.setPage(1);
  }

  @Input() set category(value: Category) {
    this.cachedCategory = value;
    /*  Reset pager.  */
    this.resetPager();
    this.setPage(1);
  }

  // pager object
  pager: any = {
    currentPage: -1,
    totalPages: 0,
    pages: [],
  };

  /*  */
  cachedItems: Item[] = [];
  cachedCategory: Category = null;
  scaleFactor = 1.0;
  cacheSearch: string = null;

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private flashMessage: FlashMessagesService,
  ) {
  }

  /**
   *
   * @param {Item} item
   */
  itemClick(item: Item) {
    console.log(item);
  }

  ngOnInit() {

  }

  /**
   * Compute pager.
   */
  private computePager() {
    /*  Reset pages.  */
    this.pager.pages = [];

    /*  Compute the pager.  */
    const nrDisplayElements: number = this.getNumberCols() * this.getNumberCols();
    const nrElements: number = Math.floor((this.cachedItems.length / nrDisplayElements));

    for (let i = 1; i < nrElements + 1; i++) {
      this.pager.pages.push(i);
    }

    console.log(nrElements);
    this.pager.totalPages = nrElements;
  }

  /**
   *
   * @returns {number}
   */
  getNumberCols() {
    /*  TODO add logic for what device platform is used.  */
    return 1; //window.screen.width / (this.getRowHeight() * 2);
  }

  /**
   *
   * @returns {number}
   */
  getRowHeight() {
    /*  TODO add some logic based on the resolution of the media. */
    return 100 * this.scaleFactor;
  }

  /**
   *
   * @param factor
   */
  setScaleFactor(factor) {
    this.scaleFactor = factor;
  }

  /**
   *
   * @returns {{text: string; cols: number; rows: number; color: string}[]}
   */
  getItems() {

    const tiles = [];
    /*  Temporarily const variables. TODO resolve */
    for (let i = 0; i < this.cachedItems.length; i++) {
      const item: Item = this.cachedItems[i];

      /*  Add item. */
      tiles.push(
        {
          cols: (i % this.getNumberCols()) + 1,
          rows: (i / this.getNumberCols()) + 1,
          item: item
        }
      );
    }

    return tiles;
  }


  /**
   *
   */
  private resetPager(){
    this.pager = {
      currentPage: -1,
      totalPages: 0,
      pages: [],
    };
  }

  /**
   *
   * @param {number} number
   */
  setPage(number: number) {

    /*  Compute the new valid page and compare with current.  */
    const newPage = Math.min(Math.max(number, 1), this.pager.totalPages);
    if (newPage === this.pager.currentPage)
      return;

    /*  Set new page log it.  */
    console.log("page " + newPage);
    this.pager.currentPage = newPage;

    /*  Update items list.  */
    if (this.cachedCategory != null) {
      /*  TODO add page offset and number of elements to extract. */
      this.itemService.getItems(this.cachedCategory).subscribe(result => {
        console.log(result);
        this.cachedItems = result;

        /*  Update pager. */
        this.computePager();

      }, error => {
        /*  Display error if items could not be displayed.  */
        this.flashMessage.show('Error with the product server ;' + error + '  - Thanks for your the patience!', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      });
    } else if (this.cacheSearch != null) {

    }

    return true;
  }
}
