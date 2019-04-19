import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveInventoryComponent } from './remove-inventory.component';

describe('RemoveInventoryComponent', () => {
  let component: RemoveInventoryComponent;
  let fixture: ComponentFixture<RemoveInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
