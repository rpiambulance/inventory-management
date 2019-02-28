import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvFormComponent } from './new-inv-form.component';

describe('NewInvFormComponent', () => {
  let component: NewInvFormComponent;
  let fixture: ComponentFixture<NewInvFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInvFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
