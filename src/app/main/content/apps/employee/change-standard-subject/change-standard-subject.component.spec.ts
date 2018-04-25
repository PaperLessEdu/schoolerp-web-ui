import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStandardSubjectComponent } from './change-standard-subject.component';

describe('ChangeStandardSubjectComponent', () => {
  let component: ChangeStandardSubjectComponent;
  let fixture: ComponentFixture<ChangeStandardSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStandardSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStandardSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
