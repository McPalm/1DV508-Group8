import {Injectable} from '@angular/core';
import {Category} from './category';
import {AngularFireDatabase} from 'angularfire2/database';
import {Item} from './item';
import {Observable} from 'rxjs/Observable';
import {FirebaseApp} from "angularfire2";

@Injectable()
export class ItemService {

  private itemPath = "/items";
  private storage;

  constructor(private db: AngularFireDatabase,
              private firebase: FirebaseApp) {
    this.storage = this.firebase.storage();
  }

  /**
   * Get item based on the uid.
   * @param {string} uid
   * @returns {Observable<Item[]>}
   */
  public getItem(uid: string) {
    const items = this.db.list(this.itemPath,
      ref => ref.orderByChild('uid').equalTo(uid)
    ).valueChanges();
    return this.resolvePath(items);
  }

  /**
   * Get all items in a specified category
   * @param category
   */
  getItems(category: Category): Observable<Item[]> {

    /*  Filtered from category. */
    const items = this.db.list(this.itemPath,
      ref => ref.orderByChild('category').equalTo(category.uid)
    ).valueChanges();
    return this.resolvePath(items);
  }

  /**
   * Resolve the image path for each item elements.
   * @param {Observable<Item[]>} list
   * @returns {Observable<Item[]>}
   */
  private resolvePath(list: Observable<any[]>): Observable<Item[]> {
    const pathresolved = list.map((items: Item[]) => {

      /*  Error checking. */
      if (items === undefined) {
        throw new Error('Internal error with fetching https path url for items.');
      }

      /*  Iterate through each item.  */
      return items.map((item: Item) => {

        /*  Error checking. */
        if (item === undefined) {
          throw new Error('Internal error with fetching https path url for items.');
        }

        /*  Ignore if path is already a valid URL.  */
        if ( item.path.startsWith('https://') || item.path.length === 0 ) {
          return item;
        }

        /*  Cache the bucket path and give the item a tmp path. */
        const cache = item.path;
        item.path = '';

        /*  Get Downloadable URL. */
        this.storage.refFromURL(cache).getDownloadURL().then(path => {
          item.path = path;
        }).catch(error => {
          console.log(error);
        });

        return item;
      });
    });
    return pathresolved;
  }

  /**
   * Get all items currently on the server
   * @param category
   */
  getItemsAll(): Observable<Item[]> {
    return this.resolvePath(this.db.list(this.itemPath).valueChanges());
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
  }

  delete(id : String) : void {
    var ref = this.db.database.ref().child(`${this.itemPath}/${id}`);
    ref.remove();
  }

  /**
   * Updates item information
   * @param item
   */
  updateItem(item : Item) : void {
    let dbRef = this.db.database.ref(this.itemPath + "/" + item.uid);
    dbRef.update(item);
   }

   /**
    * Get specified number of the most recent items in a list, in the order oldest to newest
    * @param amount amount of items requested
    */
   public getRecentItems(amount: number): Observable<Item[]> {
     const items = this.db.list(this.itemPath,
       ref => ref.limitToLast(amount)
     ).valueChanges();
     return this.resolvePath(items);
   }

   /**
    * Toggle item highlight
    * @param uid uid for the item to toggle hightlight status
    */
   toggleHighlight(uid: string) : void {
     let item;
     let dbRef = this.db.object(`${this.itemPath}/${uid}`).valueChanges().subscribe(i => {
       item = i;
       if(item.highlighted) {
         item.highlighted = false;
       } else {
         item.highlighted = true;
       }
       this.db.object(`${this.itemPath}/${uid}`).update(item);
       dbRef.unsubscribe();
     })
   }

   /**
    * Get all highlighted items
    */
   getHighlightedItems() : Observable<Item[]> {
    const items = this.db.list(this.itemPath,
      ref => ref.orderByChild('highlighted').equalTo(true)
    ).valueChanges();
    return this.resolvePath(items);
   }
}
