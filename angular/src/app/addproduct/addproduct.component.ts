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
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

	
	task: AngularFireUploadTask;
	percentage: Observable<number>;
	snapshot: Observable<any>;
	downloadURL: Observable<string>;
	isHovering: boolean;
	selectedFiles: FileList;
	file: File;
	@ViewChild('myInput')
	myInputVariable: any;

	constructor(
		private categoryService : CategoryService,
		private itemService : ItemService,
		private storage: AngularFireStorage,
	) { }

	model = new Item();

	categories: Observable<Category[]>;

	submitted = false;

	onSubmit() {
    
		this.startUpload();
		this.itemService.addItem(this.model);
		this.model = new Item();
		this.reset()
	}

	ngOnInit() {
		this.categories = this.categoryService.getCategories();
	}


	addProduct() {


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

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
  
  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);

	}
	
	
}
