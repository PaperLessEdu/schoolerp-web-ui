import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTakerComponent } from './attendance-taker.component';

describe('AttendanceTakerComponent', () => {
  let component: AttendanceTakerComponent;
  let fixture: ComponentFixture<AttendanceTakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceTakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
