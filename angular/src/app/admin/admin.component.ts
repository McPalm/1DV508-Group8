import { Component, OnInit , Input} from '@angular/core';
import { AddcategoryComponent} from '../addcategory/addcategory.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

	/* Add some admin check when logging in
	if admin this.isVisible=true;
	*/
}
