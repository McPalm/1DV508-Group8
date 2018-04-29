import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../services/item';

@Component({
  selector: 'app-item-thumb-nail',
  templateUrl: './item-thumb-nail.component.html',
  styleUrls: ['./item-thumb-nail.component.css']
})
export class ItemThumbNailComponent implements OnInit {

  @Input() item :Item;
  /**
   * Use this to listen to clicks on this, returns a ref to the item you gave it.
   */
  @Output() callback: EventEmitter<Item> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  onClick() : void {
    if(this.callback != null)
      this.callback.emit(this.item);
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