import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardAddEditComponent } from './standard-add-edit.component';

describe('StandardAddComponent', () => {
  let component: StandardAddEditComponent;
  let fixture: ComponentFixture<StandardAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
