import { Component, OnInit } from '@angular/core';
import { Item } from '../services/item';
import { Category } from '../services/category';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

	constructor(
		private categoryService : CategoryService,
    private itemService : ItemService,
    private storage: AngularFireStorage,
	) { }

	model = new Item();

  categories: Observable<Category[]>;
  items: Observable<Item[]>;
  selectedProduct: Item;

  task: AngularFireUploadTask;
	percentage: Observable<number>;
	snapshot: Observable<any>;
	downloadURL: Observable<string>;
	isHovering: boolean;
	selectedFiles: FileList;
	file: File;
	@ViewChild('myInput')
	myInputVariable: any;

	onSubmit() {
    if (this.selectedFiles) {
      this.startUpload();
    }
	this.model.category = Number(this.model.category);
	this.itemService.updateItem(this.model);
    this.model = new Item();
    this.reset()
	}

	ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.items = this.itemService.getItemsAll();
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

	chooseFiles(event) {
    this.selectedFiles = event.target.files;
  }


  startUpload() {
    let file = this.selectedFiles.item(0);
     const path = `products/${new Date().getTime()}_${file.name}`;

      // The main task
      this.task = this.storage.upload(path, file)

      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot   = this.task.snapshotChanges()

    this.model.path = 'gs://dv508-project-8.appspot.com/' + path;
    }

  selectProduct() {
    this.model.name = this.selectedProduct.name;
    this.model.price = this.selectedProduct.price;
    this.model.category = this.selectedProduct.category;
    this.model.description = this.selectedProduct.description;
    this.model.uid = this.selectedProduct.uid;
    this.model.count = this.selectedProduct.count;
	this.model.rateHigh = this.selectedProduct.rateHigh;
	this.model.rateLow = this.selectedProduct.rateLow;
  }

   // Determines if the upload task is active
   isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  reset() {
    this.myInputVariable.nativeElement.value = "";
    this.selectedFiles = null;
	}
}
