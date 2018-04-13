import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTimePickerComponent } from './template-time-picker.component';

describe('TemplateTimePickerComponent', () => {
  let component: TemplateTimePickerComponent;
  let fixture: ComponentFixture<TemplateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
