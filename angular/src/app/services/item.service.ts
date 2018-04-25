import { Injectable } from '@angular/core';
import { Category } from './category';
import { AngularFireList } from 'angularfire2/database';
import { Item } from './item';

@Injectable()
export class ItemService {

  constructor() { }

  /**
   * Get all items in a specified category
   * @param category
   */
  getItems(category : Category) : AngularFireList<Item> {
    console.log("Not yet implemented!");
    return null;
  }

  /**
   * Get all items currently on the server
   * @param category 
   */
  getItemsAll() : AngularFireList<Item> {
    console.log("Not yet implemented!");
    return null;
  }
  
  /**
   * Push an item to the database
   * @param item an item object to put in the database
   */
  addItem(item : Item) : void {
    console.log("Not yet implemented!");
  }
}
