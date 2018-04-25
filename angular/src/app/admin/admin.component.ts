import { Component, OnInit , Input} from '@angular/core';
import { AddcategoryComponent} from '../addcategory/addcategory.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	isVisible: boolean = false;

    constructor() { }

    ngOnInit() {
		/* Temporary */
      this.isVisible=true;

    }

	/* Add some admin check when logging in
	if admin this.isVisible=true;
	*/
}
