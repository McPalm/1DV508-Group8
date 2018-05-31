import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { NavComponent } from '../nav/nav.component';
import { ItemService } from '../services/item.service';
import { AuthService } from '../core/auth.service';
import {ActivatedRoute} from "@angular/router";
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';

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
  private image = true;
  category;
  imageURL = "./assets/loading.gif";
  imageDefault = "./assets/logo.png";

  constructor(private cartService: CartService,
	  		  private nav: NavComponent,
			  private itemService: ItemService,
			  private authService: AuthService,
              private route: ActivatedRoute,
		      private categoryService : CategoryService) {

  }

  ngOnInit() {

    /*  Load the item assoicated with the url.  */
    this.route.params.subscribe(params => {
      this.itemService.getItem(params['uid']).subscribe(item => {
		this.item = item[0];
		this.isImage();
		let temp = this.item.path;
        if(temp.length > 10)
          imageExists(temp, (b) => {this.imageURL = (b) ? temp : this.imageDefault});
        else
        {
          // It aint pretty, but it works..  srsly tho, never do it like this.
          let interval = setInterval(() =>{
            if(this.item.path.length > 10) {
              imageExists(this.item.path, (b) => {this.imageURL = (b) ? this.item.path : this.imageDefault});
              clearInterval(interval);
            }
          }, 150);
        }
	  });
    });

	/* Get the catogory name of this item */
	this.categoryService.getCategories().subscribe(res => {
		console.log(res);
		for(let cat of res){
			if(cat.uid == this.item.category){
				this.category = cat.name;
				break;
			}
		}
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
		  }
		  else{
			  this.item.rateLow.splice(this.item.rateLow.indexOf(this.user.uid),1);
			  this.itemService.updateItem(this.item);
		  }
	  }
	  this.updateVoteCount();
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
		  }
		  else{
			  this.item.rateHigh.splice(this.item.rateHigh.indexOf(this.user.uid),1);
			  this.itemService.updateItem(this.item);
		  }
	  }
	  this.updateVoteCount();
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

  // Checks if the file associated with the product is an image
  isImage() {
	  let fileType;
	  setTimeout(() => {
	    fileType = this.item.path.match(/\..[^.]*(?=\?)/)
		switch(fileType.toString().toLowerCase()) {
		  case '.jpg':
		  case '.jpeg':
		  case '.png':
		  case '.bmp':
		  case '.svg':
		  case '.gif':
		    this.image = true;
			return
	    }
	this.image = false;
	  }, 100)
  }
}

function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}
