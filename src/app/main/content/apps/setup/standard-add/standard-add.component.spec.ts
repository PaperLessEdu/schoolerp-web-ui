import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardAddComponent } from './standard-add.component';

describe('StandardAddComponent', () => {
  let component: StandardAddComponent;
  let fixture: ComponentFixture<StandardAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
