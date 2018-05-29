import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Item} from './item';
import {ItemService} from './item.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchService {

  private items: Item[];
  private searchSource = new BehaviorSubject<string>('');
  currentSearch = this.searchSource.asObservable();

  constructor(private db: AngularFireDatabase, private is: ItemService) {
    is.getItemsAll().subscribe(i => this.items = i);
  }

  /**
   * Set current search query.
   * @param {string} search
   */
  public changeSearch(search: string) {
    this.searchSource.next(search);
  }

  search(param: string) : Item[] {
    param = param.toLowerCase()
    let params = param.split(" ");
    return this.items.map(
      i => {
        let prio = 0;
        for(let p of params){
          if(i.name.toLowerCase().search(p) != -1)
            prio += 1;
          if(i.description.toLocaleLowerCase().search(p) != -1)
            prio += 0.5;
          if(i.keyword != null) {
            if(i.keyword.toLocaleLowerCase().search(p) != -1)
              prio += 0.5;
          }
        }
        (i as any).prio = prio;
        return i;     
      }
    ).filter(
      i => {
        return (i as any).prio > 0;
      }
    ).sort(
      (a, b) => {
        return (b as any).prio - (a as any).prio;
      }
    );
  }

}
