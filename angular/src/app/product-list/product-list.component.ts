import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ItemService} from '../services/item.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Item} from '../services/item';
import {Category} from '../services/category';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  /**
   * For listening to search query.
   * @param {string} value
   */
  @Input() set search(value: string) {
    this._search = value;
    this.resetPager();
    this.setPage(1);
  }

  /**
   * listening for external category changes.
   * @param {Category} value
   */
  @Input() set category(value: Category) {
    this._category = value;
    /*  Reset pager.  */
    this.resetPager();
    this.setPage(1);
  }

  /**
   * Listening for external scale factor.
   * @param {number} scale
   */
  @Input() set scale(scale: number) {
    this.setScaleFactor(scale);
  }

  // pager object
  private pager: any = {
    currentPage: -1, /*  [1, inf]*/
    totalPages: 1, /*  [1, inf]*/
    pages: [], /* Pages as their page number. [1,2,3,...,n] */
  };

  /*  */
  _items: Item[] = [];
  _category: Category = null;
  scaleFactor = 1.0;
  _search: string = null;
  breakpoint = 2;
  tiles;

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private flashMessage: FlashMessagesService,
    private searchService: SearchService
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
    const nrDisplayElements: number = this.getNrElementOnPage();
    const nrElements: number = Math.ceil((this._items.length / nrDisplayElements));

    const indicesOffset = 1;
    for (let i = indicesOffset; i < nrElements + indicesOffset; i++) {
      this.pager.pages.push(i);
    }

    this.pager.totalPages = nrElements;
  }

  /**
   * Get number of Column
   * @returns {number}
   */
  public getNumberCols() {
    return this.breakpoint * this.scaleFactor;
  }

  /**
   * Get number of possible elements on the page.
   * @returns {number}
   */
  public getNrElementOnPage() {
    return this.getNumberCols() * this.getNumberCols();
  }

  /**
   * Set the zoom factor.
   * @param factor display factor.
   */
  private setScaleFactor(factor) {
    this.scaleFactor = Math.min(Math.max(factor, 1.0), 10.0);
  }

  /**
   * Get scale factor.
   * @returns {number}
   */
  protected getScaleFactor() {
    return this.scaleFactor;
  }

  /**
   * Compute the items for display, based on the
   * current pager.
   *
   * @returns {{text: string; cols: number; rows: number; color: string}[]}
   */
  private computeItem() {

    const tiles = [];

    const offset = (this.pager.currentPage - 1) * this.getNrElementOnPage();
    const nrElements = this._items.length - offset;

    /*  Iterate through each element. */
    for (let i = 0; i < this.getNrElementOnPage() && i < nrElements; i++) {
      const item: Item = this._items[offset + i];

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
      totalPages: 1,
      pages: [],
    };
  }

  /**
   * Set current page.
   * @param {number} number
   */
  public setPage(number: number) {

    /*  Compute the new valid page and compare with current.  */
    const newPage = Math.min(Math.max(number, 1), this.pager.totalPages);
    if (newPage === this.pager.currentPage) {
      return;
    }

    /*  Set new page log it.  */
    this.pager.currentPage = newPage;

    /*  Update items list.  */
    if (this._category != null) {
      /*  TODO add page offset and number of elements to extract. */

      this.itemService.getItems(this._category).subscribe((result: Item[]) => {
        this._items = result;

        /*  */
        this.tiles = this.computeItem();

        /*  Update pager. */
        this.computePager();

      }, error => {
        /*  Display error if items could not be displayed.  */
        this.flashMessage.show('Error with the product server ;' + error + '  - Thanks for your the patience!', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      });
    } else if (this._search != null) {

      /*  Only search by search input.  */
      const result = this.searchService.search(this._search);
      console.log(result);
      this._items = result;
      this.tiles = this.computeItem();

      /*  Update pager. */
      this.computePager();
    }

    return true;
  }

  /**
   * Recompute number of column.
   * @param event
   */
  protected onResize(event) {
    this.breakpoint = this.computeBreakPoints(event.target.innerWidth);
    this.tiles = this.computeItem();
  }

  /**
   * Compute the column break point.
   *
   * @param {number} width in pixels.
   * @returns {number} number of column.
   */
  private computeBreakPoints(width: number) {
    return width < 768 ? 1 : Math.floor(this.getScaleFactor() * (width - 320) / 640);
  }

  /**
   * Search.
   */
  protected onSearch() {
    this.resetPager();
    this._category = null;
    this.setPage(1);
  }
}
