import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardListComponent } from './standard-list.component';

describe('StandardsComponent', () => {
  let component: StandardListComponent;
  let fixture: ComponentFixture<StandardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
