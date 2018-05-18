import { Injectable } from '@angular/core';
import { Category } from './category';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Item } from './item';
import { Observable } from 'rxjs/Observable';
import {FirebaseApp} from "angularfire2";

@Injectable()
export class ItemService {

  private itemPath = "/items";
  private storage;

  constructor(private db : AngularFireDatabase,
              private firebase: FirebaseApp) {
    this.storage = this.firebase.storage();
  }

  /**
   * Get all items in a specified category
   * @param category
   */
  getItems(category: Category): Observable<any[]> {

    /*  Filtered from category. */
    const items = this.db.list(this.itemPath ,
      ref => ref.orderByChild('category').equalTo(category.uid)
    ).valueChanges();

    return this.resolvePath(items);
  }

  /**
   *
   * @param {Observable<Item[]>} list
   * @returns {Observable<Item[]>}
   */
  private resolvePath(list: Observable<Item[]>): Observable<Item[]> {
    const pathresolved = list.map((item: Item[]) => {
      /*  Iterate through each item.  */
      return item.map(item1 => {
        /*  Ignore if path is already a valid URL.  */
        if ( item1.path.startsWith('https://') ) {
          return;
        }

        /*  Cache the bucket path and give the item a tmp path. */
        const cache = item1.path;
        item1.path = '';

        /*  Get Downloadable URL. */
        this.storage.refFromURL(cache).getDownloadURL().then(path => {
          console.log('new path: ' + path);
          item1.path = path;
        }).catch(error => {
          console.log(error);
        });

        return item1;
      });
    });
    return pathresolved;
  }

  /**
   * Get all items currently on the server
   * @param category
   */
  getItemsAll() : Observable<any[]> {
    return this.resolvePath( this.db.list(this.itemPath).valueChanges());
  }

  /**
   * Push an item to the database
   * @param item an item object to put in the database
   */
  addItem(item : Item) : void {
	item.rateHigh = new Array();
  	item.rateLow = new Array();
  	item.rateHigh.push("0");
  	item.rateLow.push("0");

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

  /**
   * Updates item information
   * @param item
   */
  updateItem(item : Item) : void {
    let dbRef = this.db.database.ref(this.itemPath + "/" + item.uid);
    dbRef.update(item);
   }
}
