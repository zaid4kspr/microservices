import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNoaddressesDeliveriesComponent } from './main-noaddresses-deliveries.component';

describe('MainNoaddressesDeliveriesComponent', () => {
  let component: MainNoaddressesDeliveriesComponent;
  let fixture: ComponentFixture<MainNoaddressesDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNoaddressesDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNoaddressesDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
