import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemThumbNailComponent } from './item-thumb-nail.component';

describe('ItemThumbNailComponent', () => {
  let component: ItemThumbNailComponent;
  let fixture: ComponentFixture<ItemThumbNailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemThumbNailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemThumbNailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
