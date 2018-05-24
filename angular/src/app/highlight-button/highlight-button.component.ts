import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../services/item';

@Component({
  selector: 'app-highlight-button',
  templateUrl: './highlight-button.component.html',
  styleUrls: ['./highlight-button.component.css']
})
export class HighlightButtonComponent implements OnInit {

  @Input() item: Item;
  
  private highlighted : boolean = true;

  constructor(private ItemService : ItemService) { }

  ngOnInit() {
    this.highlighted = this.item.highlighted;
  }

  toggleHighlight() : void {
    this.ItemService.toggleHighlight(this.item.uid);
    if (this.highlighted) {
      this.highlighted = false;
    } else {
      this.highlighted = true;
    }
  }
}
