import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationHomeComponent } from './communication-home.component';

describe('CommunicationHomeComponent', () => {
  let component: CommunicationHomeComponent;
  let fixture: ComponentFixture<CommunicationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
