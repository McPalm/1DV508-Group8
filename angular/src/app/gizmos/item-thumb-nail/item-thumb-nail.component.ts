import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../services/item';
import {CartService} from '../../services/cart.service';
import {FirebaseApp} from 'angularfire2';

@Component({
  selector: 'app-item-thumb-nail',
  templateUrl: './item-thumb-nail.component.html',
  styleUrls: ['./item-thumb-nail.component.css']
})
export class ItemThumbNailComponent implements OnInit {

  @Input() item: Item;
  imageURL;

  /**
   * Use this to listen to clicks on this, returns a ref to the item you gave it.
   */
  @Output() callback: EventEmitter<Item> = new EventEmitter();

  constructor(private cartService: CartService,
              private firebase: FirebaseApp
  ) {
  }

  ngOnInit() {

    /*  Load image from storage by bucket path. */
    const storage = this.firebase.storage();
    storage.refFromURL(this.item.path).getDownloadURL().then(result => {
      console.log(result);
      this.imageURL = result;
    });
  }

  onClick(): void {
    if( this.callback != null) {
      this.callback.emit(this.item);
    }
  }

  addCart(): void {
    this.cartService.addItem(this.item.uid);
  }
}



/**
 * Example of use of this comoponent
 *
    <div class="col-sm-3">
      <app-item-thumb-nail
        [item]="item1"
        (callback)="itemClick($event)"
      ></app-item-thumb-nail>
    </div>


    where item1 and itemClick() both are fields in your component.
 */
