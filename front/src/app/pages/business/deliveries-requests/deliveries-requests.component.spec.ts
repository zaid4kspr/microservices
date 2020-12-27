import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesRequestsComponent } from './deliveries-requests.component';

describe('DeliveriesRequestsComponent', () => {
  let component: DeliveriesRequestsComponent;
  let fixture: ComponentFixture<DeliveriesRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
