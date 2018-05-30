import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../services/item';
import {ItemCarousel} from './ItemCarousel';

@Component({
  selector: 'app-item-carousel',
  templateUrl: './item-carousel.component.html',
  styleUrls: ['./item-carousel.component.css']
})
export class ItemCarouselComponent implements OnInit {

  _items: ItemCarousel = undefined;
  private _columns = 0;

  /**
   * Set a array of elements for display.
   * @param {Item[]} valid item array.
   */
  @Input() set items(item: ItemCarousel) {

    if (item === null) {
      throw ReferenceError('Invalid argument!');
    }

    this._items = item;
  }

  /**
   *
   * @param {number} columns
   */
  @Input('columns') set columns(columns: number) {
    if (columns < 1) {
      throw ReferenceError('Invalid argument!');
    }
    this._columns = 1;
  }

  /**
   *
   * @returns {number}
   */
  get columns(): number {
    return this._columns;
  }

  constructor() {
  }

  ngOnInit() {

  }

  /**
   *
   * @param {Item} item
   * @returns {string}
   */
  public getItemIntresstedLevel(item: Item) {
    return 'latestItem';
  }
}
