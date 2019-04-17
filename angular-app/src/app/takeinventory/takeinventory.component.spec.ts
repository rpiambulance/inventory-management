import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeinventoryComponent } from './takeinventory.component';

describe('TakeinventoryComponent', () => {
  let component: TakeinventoryComponent;
  let fixture: ComponentFixture<TakeinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
