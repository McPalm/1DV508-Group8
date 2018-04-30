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
  @Input() search: string;

  @Input() set category(value: Category) {
    this.cachedCategory = value;
    this.setPage(0);
  }

  // pager object
  pager: any = {
    currentPage: 0,
    totalPages: 3,
    pages: []
  };

  /*  */
  cachedItems: Item[] = [];
  cachedCategory: Category;

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

    /*
        if (this.search !== undefined) {
          //  Get result based on the search or cat.

        } else {

          const catagories = this.categoryService.getCategories();

          catagories.subscribe(value => {
            console.log(value);

            //  TODO add support for reading from the input variable category.
            this.itemService.getItems(value[0]).subscribe(value1 => {
              this.cachedItems = value1;
              console.log(value1);
            }, error1 => {
              this.flashMessage.show('Error with the product server - Thanks for your the patience!', {
                cssClass: 'alert-danger',
                timeout: 3000
              });
              console.error(error1);
            });

          }, error => {
            this.flashMessage.show('Error with the product server - Thanks for your the patience!', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          });


        }
        */

  }

  /**
   *
   */
  private computePager() {
    /*  Reset.  */
    this.pager.pages = [];

    /*  Compute the pager.  */
    const nrDisplayElements = this.getNumberCols() * this.getRowHeight();
    const nrElements = this.cachedItems.length / nrDisplayElements + 1;

    for (let i = 0; i < nrElements; i++) {
      this.pager.pages.push(i);
    }

    this.pager.totalPages = nrElements;
  }

  /**
   *
   * @returns {number}
   */
  getNumberCols() {
    /*  TODO add logic for what device platform is used.  */
    return 4; //window.screen.width / (this.getRowHeight() * 2);
  }

  /**
   *
   * @returns {number}
   */
  getRowHeight() {
    /*  TODO add some logic based on the resolution of the media. */
    return 300;
  }

  /**
   *
   * @returns {{text: string; cols: number; rows: number; color: string}[]}
   */
  getItems() {

    const tiles = [];
    /*  Temporarily const variables. TODO resolve */
    for (let i = 0; i < this.cachedItems.length; i++) {
      const item = this.cachedItems[i];

      tiles.push(
        {
          cols: (i % this.getNumberCols()) + 1,
          rows: (i / this.getNumberCols()) + 1,
          name: item.name,
          description: item.description,
          uid: item.uuid
        }
      );
    }

    return tiles;
  }

  /**
   *
   * @param {number} number
   */
  setPage(number: number) {

    this.pager.currentPage = number;


    /*  Update items list.  */
    if (this.cachedCategory != null || this.cachedItems !== undefined) {
      this.itemService.getItems(this.cachedCategory).subscribe(value1 => {
        this.cachedItems = value1;

        /*  Update pager. */
        this.computePager();

        /*  Update view.  */

      });
    }

    return true;
  }
}
