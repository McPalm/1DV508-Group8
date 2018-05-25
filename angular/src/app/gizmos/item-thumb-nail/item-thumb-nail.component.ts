import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../services/item';
import {CartService} from '../../services/cart.service';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-item-thumb-nail',
  templateUrl: './item-thumb-nail.component.html',
  styleUrls: ['./item-thumb-nail.component.css']
})
export class ItemThumbNailComponent implements OnInit {

  @Input() item: Item;
  imageURL = "./assets/loading.gif";
  imageDefault = "./assets/logo.png";

  /**
   * Use this to listen to clicks on this, returns a ref to the item you gave it.
   */
  @Output() callback: EventEmitter<Item> = new EventEmitter();

  constructor(private cartService: CartService,
		      private nav: NavComponent) {}

  ngOnInit() {
    let temp = this.item.path;
    if(temp.length > 10)
      imageExists(temp, (b) => {this.imageURL = (b) ? temp : this.imageDefault});
    else
      setTimeout( () => {
        temp = this.item.path;
        if(temp.length > 10)
          imageExists(temp, (b) => {this.imageURL = (b) ? temp : this.imageDefault});
        else
          this.imageURL = this.imageDefault;
      }, 550);
  }

  onClick(): void {
    if( this.callback != null) {
      this.callback.emit(this.item);
    }
  }

  addCart(): void {
    this.cartService.addItem(this.item);
  }

  openDetails(): void {
	  this.nav.setSelectedItem(this.item);
  }
}


// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
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
