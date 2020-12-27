import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressRequestsComponent } from './express-requests.component';

describe('ExpressRequestsComponent', () => {
  let component: ExpressRequestsComponent;
  let fixture: ComponentFixture<ExpressRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
