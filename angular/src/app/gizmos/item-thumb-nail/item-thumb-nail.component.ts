import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../services/item';
import {CartService} from '../../services/cart.service';
import {FirebaseApp} from 'angularfire2';
import { ItemService } from '../../services/item.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-item-thumb-nail',
  templateUrl: './item-thumb-nail.component.html',
  styleUrls: ['./item-thumb-nail.component.css']
})
export class ItemThumbNailComponent implements OnInit {

  @Input() item: Item;
  imageURL = "./assets/loading.gif";
  user;
  votesUp;
  votesDown;
  thumbUpUrl;
  thumbDownUrl;

  /**
   * Use this to listen to clicks on this, returns a ref to the item you gave it.
   */
  @Output() callback: EventEmitter<Item> = new EventEmitter();

  constructor(private cartService: CartService,
              private firebase: FirebaseApp,
			  private itemService : ItemService,
		      private authService: AuthService) {}

  ngOnInit() {

    /*  Load image from storage by bucket path. */
    /*
    const storage = this.firebase.storage();
    storage.refFromURL(this.item.path).getDownloadURL().then(result => {
      this.imageURL = result;
    });
    */

	/* Get user details */
	this.authService.getUser().subscribe(res => {this.user = res;
												 this.updateVoteCount();});
  }

  onClick(): void {
    if( this.callback != null) {
      this.callback.emit(this.item);
    }
  }

  addCart(): void {
    this.cartService.addItem(this.item);
  }

  rateDown() : void {
	  if(this.user != null){

		  // Check for duplicate vote
		  if(this.item.rateLow.indexOf(this.user.uid) == -1){
			  this.item.rateLow.push(this.user.uid);
			  console.log(`Added ${this.user.uid} to rate low`);

			  // Check if user has voted in the other array
			  if(this.item.rateHigh.indexOf(this.user.uid) != -1){
				  console.log("Duplicate in other array");
				  this.item.rateHigh.splice(this.item.rateHigh.indexOf(this.user.uid),1);
			  }

			  this.itemService.updateItem(this.item);
		  }
		  else{
			  console.log("Duplicate rating");
		  }
	  }
  }

  rateUp() : void {
	  if(this.user != null){
		  // Check for duplicate vote
		  if(this.item.rateHigh.indexOf(this.user.uid) == -1){
			  this.item.rateHigh.push(this.user.uid);
			  console.log(`Added ${this.user.uid} to rate high`);

			  // Check if user has voted in the other array
			  if(this.item.rateLow.indexOf(this.user.uid) != -1){
				  console.log("Duplicate in other array");
				  this.item.rateLow.splice(this.item.rateLow.indexOf(this.user.uid),1);
			  }

			  this.itemService.updateItem(this.item);
		  }
		  else{
			  console.log("Duplicate rating");
		  }
	  }
  }

  updateVoteCount() : void {
	  this.votesUp = (this.item.rateHigh.length -1);
	  this.votesDown = (this.item.rateLow.length -1);

	  this.thumbUpUrl = "./assets/thumb-up.png";
	  this.thumbDownUrl = "./assets/thumb-down.png";

	  if(this.user != null){
		  if(this.item.rateHigh.indexOf(this.user.uid) != -1){
			  this.thumbUpUrl = "./assets/thumb-up-filled.png";
		  }
		  if(this.item.rateLow.indexOf(this.user.uid) != -1){
			  this.thumbDownUrl = "./assets/thumb-down-filled.png";
		  }
	  }
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
