import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePersonComponent } from './remove-person.component';

describe('RemovePersonComponent', () => {
  let component: RemovePersonComponent;
  let fixture: ComponentFixture<RemovePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
