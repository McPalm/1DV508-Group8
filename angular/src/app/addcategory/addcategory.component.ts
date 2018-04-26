import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  isVisible: boolean = false;
  categories = ['Electronics', 'Guns'];

  constructor() { }

  ngOnInit() {
  }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }

  addCategory(newCategory : string) {
	  if(newCategory){
		  this.categories.push(newCategory);
	  }
  }
}
