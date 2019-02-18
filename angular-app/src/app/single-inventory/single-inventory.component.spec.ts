import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInventoryComponent } from './single-inventory.component';

describe('SingleInventoryComponent', () => {
  let component: SingleInventoryComponent;
  let fixture: ComponentFixture<SingleInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
