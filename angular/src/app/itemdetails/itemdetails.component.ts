import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { NavComponent } from '../nav/nav.component';
import { ItemService } from '../services/item.service';
import { AuthService } from '../core/auth.service';
import {ActivatedRoute} from "@angular/router";
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent implements OnInit {

  item: Item;
  user;
  votesUp;
  votesDown;
  thumbUpUrl;
  thumbDownUrl;
  private admin = 'false';

  constructor(private cartService: CartService,
	  		  private nav: NavComponent,
			  private itemService: ItemService,
			  private authService: AuthService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {

    /*  Load the item assoicated with the url.  */
    this.route.params.subscribe(params => {
      this.itemService.getItem(params['uid']).subscribe(item => {
        this.item = item[0];
      });
    });

	  /* Get user details */
      this.authService.getUser().subscribe(res => {
		  if(res != null){
			  this.user = res;
		  	  this.admin = res.admin;
	      }
  	      this.updateVoteCount();
	  });
  }

  download() : void {
	  window.open(this.item.path);
  }

  addCart() : void {
    this.cartService.addItem(this.item);
  }

  rateDown() : void {
	  if(this.user != null){

		  // Check for duplicate vote
		  if(this.item.rateLow.indexOf(this.user.uid) == -1){
			  this.item.rateLow.push(this.user.uid);

			  // Check if user has voted in the other array
			  if(this.item.rateHigh.indexOf(this.user.uid) != -1){
				  this.item.rateHigh.splice(this.item.rateHigh.indexOf(this.user.uid),1);
			  }

			  this.itemService.updateItem(this.item);
			  this.updateVoteCount();
		  }
	  }
  }

  rateUp() : void {
	  if(this.user != null){
		  // Check for duplicate vote
		  if(this.item.rateHigh.indexOf(this.user.uid) == -1){
			  this.item.rateHigh.push(this.user.uid);

			  // Check if user has voted in the other array
			  if(this.item.rateLow.indexOf(this.user.uid) != -1){
				  this.item.rateLow.splice(this.item.rateLow.indexOf(this.user.uid),1);
			  }

			  this.itemService.updateItem(this.item);
			  this.updateVoteCount();
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
