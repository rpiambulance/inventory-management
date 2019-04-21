import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatequantityComponent } from './updatequantity.component';

describe('UpdatequantityComponent', () => {
  let component: UpdatequantityComponent;
  let fixture: ComponentFixture<UpdatequantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatequantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatequantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
