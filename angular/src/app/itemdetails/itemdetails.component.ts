import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { NavComponent } from '../nav/nav.component';
import { ItemService } from '../services/item.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent implements OnInit {

  item;
  user;
  votesUp;
  votesDown;
  thumbUpUrl;
  thumbDownUrl;
  private admin = 'false';

  constructor(private nav: NavComponent,
			  private itemService: ItemService,
			  private authService: AuthService) { }

  ngOnInit() {
	  this.item = this.nav.getSelectedItem();

	  /* Get user details */
	  this.authService.getUser().subscribe(res => {
		  this.user = res;
		  this.admin = res.admin;
		  this.updateVoteCount();
		});
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
			  this.updateVoteCount();
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
			  this.updateVoteCount();
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
