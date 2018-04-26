import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaceTakerComponent } from './attendace-taker.component';

describe('AttendaceTakerComponent', () => {
  let component: AttendaceTakerComponent;
  let fixture: ComponentFixture<AttendaceTakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendaceTakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaceTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
