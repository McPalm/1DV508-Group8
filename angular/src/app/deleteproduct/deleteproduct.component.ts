import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { ItemService } from '../services/item.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {

  constructor(private db : AngularFireDatabase,
	          private itemService : ItemService) { }

  items: Observable<Item[]>;
  deleteId: String = "default";

  ngOnInit() {
	  this.items = this.itemService.getItemsAll();
  }

  deleteProduct(){
	  this.itemService.delete(this.deleteId);
  }
}
