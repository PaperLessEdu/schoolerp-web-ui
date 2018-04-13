import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddEditComponent } from './template-add-edit.component';

describe('TemplateAddEditComponent', () => {
  let component: TemplateAddEditComponent;
  let fixture: ComponentFixture<TemplateAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
