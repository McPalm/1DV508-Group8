import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Category } from './category';
import { Observable } from 'rxjs/observable'

@Injectable()
export class CategoryService {
  private categories: Observable<Category[]>;
  private db;
  private id: number = 0;

  constructor(db: AngularFireDatabase) {
    this.db = db;
  }

  getCategories(): Observable<Category[]> {
    this.categories = this.db.list('categories').valueChanges();
    return this.categories;
  }

  addCategory(cat: string, desc: string) {
    let dbRef = this.db.list('categories').valueChanges();
    dbRef = dbRef.subscribe(catList => {
      this.id = catList.length;
      let data: Category = {
        uid: this.id,
        name: cat,
        description: desc,
      }
      this.db.object(`categories/${this.id}`).update(data);
      dbRef.unsubscribe();
    })
  }
}
