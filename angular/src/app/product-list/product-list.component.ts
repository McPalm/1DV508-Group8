import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {ItemService} from "../services/item.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Category} from "../services/category";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() search: string;
  /*  For listening to search query.  */
  // pager object
  pager: any = {
    currentPage: 0,
    totalPages: 3
  };

  constructor(private catagory: CategoryService, private items: ItemService, private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {

    if (this.search !== undefined) {
      /*  Get result based on the search. */
    } else {
      const catagories = this.catagory.getCategories();
      const listCatagories: Category[] = [];

      /*  */
      if (listCatagories.length === 0) {
        this.flashMessage.show("Error with the product server - Thanks for your the patience!", {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      } else {
        this.items.getItems(this.catagory[0]);
      }
    }

    /*  Compute the pager.  */
    this.pager.pages = [0, 1, 2, 3];

  }

  /**
   *
   * @returns {number}
   */
  getNumberCols() {
    return 4;
  }

  /**
   *
   * @returns {number}
   */
  getRowHeight() {
    return 100;
  }

  /**
   *
   * @returns {{text: string; cols: number; rows: number; color: string}[]}
   */
  getTiles() {

    /*  Temporarily const variables. TODO resolve */
    const tiles = [
      {text: 'One', cols: 3, rows: 1, color: 'lightblue', description: "I'm suppose to be coffe", uid: 0},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen', description: "I'm suppose to be something useful", uid: 1},
      {text: 'Three', cols: 1, rows: 1, color: 'lightpink', description: "I'm suppose to be a RX 580", uid: 2},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1', description: "none", uid: 3},
    ];

    return tiles;
  }

  /**
   *
   * @param {number} number
   */
  setPage(number: number) {
    return true;
  }

  /**
   *
   * @param {number | string | any} uid
   * @returns {string}
   */
  getImageSource(uid: number | string | any) {
    return '';
  }
}
