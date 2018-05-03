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

  /*  listening for external category changes.  */
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
  breakpoint = 2;
  tiles;
  /*  Constants.  */
  MAXROW = 6;
  MAXCOLUMN = 3;

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private flashMessage: FlashMessagesService,
  ) {
  }

  /**
   * Select item.
   * @param {Item} item
   */
  itemClick(item: Item) {
    /*  TODO add logic for changing router to the view of the product!  */
    console.log(item);
  }

  ngOnInit() {
    this.breakpoint = this.computeBreakPoints(window.innerWidth);
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
   * Get number of Column
   * @returns {number}
   */
  getNumberCols() {
    return this.breakpoint * this.scaleFactor;
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
   * Set the zoom factor.
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
          item: item
        }
      );
    }

    return tiles;
  }


  /**
   * Reset pager to default.
   */
  private resetPager() {
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
    if (newPage === this.pager.currentPage) {
      return;
    }

    /*  Set new page log it.  */
    console.log("page " + newPage);
    this.pager.currentPage = newPage;

    /*  Update items list.  */
    if (this.cachedCategory != null) {
      /*  TODO add page offset and number of elements to extract. */
      this.itemService.getItems(this.cachedCategory).subscribe(result => {
        console.log(result);
        this.cachedItems = result;

        /*  */
        this.tiles = this.getItems();

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

  /**
   * Recompute number of column.
   * @param event
   */
  onResize(event) {
    this.breakpoint = this.computeBreakPoints(event.target.innerWidth);
    this.tiles = this.getItems();
  }

  /**
   *
   * @param {number} width
   * @returns {number}
   */
  private computeBreakPoints(width: number) {
    return width < 768 ? 1 : this.MAXCOLUMN;
  }
}
