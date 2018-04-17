import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayAddEditComponent } from './holiday-add-edit.component';

describe('HolidayAddEditComponent', () => {
  let component: HolidayAddEditComponent;
  let fixture: ComponentFixture<HolidayAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
