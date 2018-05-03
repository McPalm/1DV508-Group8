import { Injectable } from '@angular/core';
import { Category } from './category';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Item } from './item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  private itemPath = "/items";

  constructor(private db : AngularFireDatabase) { }

  /**
   * Get all items in a specified category
   * @param category
   */
  getItems(category : Category) : Observable<any[]> {

    return this.db.list(this.itemPath ,
      ref => ref.orderByChild('category').equalTo(category.uid)
    ).valueChanges();

  }

  /**
   * Get all items currently on the server
   * @param category
   */
  getItemsAll() : Observable<any[]> {
    return this.db.list(this.itemPath).valueChanges();
  }

  /**
   * Push an item to the database
   * @param item an item object to put in the database
   */
  addItem(item : Item) : void {
    const obj = this.db.database.ref(this.itemPath);
    item.category = Number(item.category);
	item.uid = this.db.database.ref().push().key;
    obj.child(item.uid).set(item);
    console.log(`pushed ${this.itemPath}/${item.uid}`);
  }

  delete(id : String) : void {
    var ref = this.db.database.ref().child(`${this.itemPath}/${id}`);
    ref.remove();
    console.log(`removed ${this.itemPath}/${id}`);
  }
}
