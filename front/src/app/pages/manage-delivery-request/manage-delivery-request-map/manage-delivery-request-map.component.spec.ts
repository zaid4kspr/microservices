import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeliveryRequestMapComponent } from './manage-delivery-request-map.component';

describe('ManageDeliveryRequestMapComponent', () => {
  let component: ManageDeliveryRequestMapComponent;
  let fixture: ComponentFixture<ManageDeliveryRequestMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDeliveryRequestMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeliveryRequestMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
