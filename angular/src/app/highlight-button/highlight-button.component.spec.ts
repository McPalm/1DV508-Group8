import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightButtonComponent } from './highlight-button.component';

describe('HighlightButtonComponent', () => {
  let component: HighlightButtonComponent;
  let fixture: ComponentFixture<HighlightButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
