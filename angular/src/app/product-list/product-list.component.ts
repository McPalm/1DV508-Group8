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
  @Input() category: Category;

  // pager object
  pager: any = {
    currentPage: 0,
    totalPages: 3
  };

  /*  */
  cachedItems: Item[] = [];

  constructor(private catagory: CategoryService, private items: ItemService, private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {

    if (this.search !== undefined) {
      /*  Get result based on the search or cat. */

    } else {

      const catagories = this.catagory.getCategories();

      catagories.subscribe(value => {
        console.log(value);

        /*  TODO add support for reading from the input variable category.  */
        this.items.getItems(value[0]).subscribe(value1 => {
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

    /*  Compute the pager.  */
    this.pager.pages = [0, 1, 2, 3];
  }

  /**
   *
   */
  private computePager() {

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
  getTiles() {

    const tiles = [];
    /*  Temporarily const variables. TODO resolve */
    for (let i = 0; i < this.cachedItems.length; i++) {
      const item = this.cachedItems[i];

      tiles.push(
        {
          text: 'One',
          cols: (i % this.getNumberCols()) + 1,
          rows: (i / this.getNumberCols()) + 1,
          color: 'lightblue',
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

    /*  Update items list.  */

    /*  Update pager. */

    /*  Update view.  */

    return true;
  }

  /**
   *
   * @param {number | string | any} uid
   * @returns {string}
   */
  getImageURL(uid: number | string | any) {
    const imgRef = '/products/' + uid.toString() + '/preview.png';
    /*  Get image url from storage. */

    return '';
  }
}
