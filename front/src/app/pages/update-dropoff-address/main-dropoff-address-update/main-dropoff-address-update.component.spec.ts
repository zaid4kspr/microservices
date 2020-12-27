import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDropOffAddressUpdateComponent } from './main-dropoff-address-address.component';

describe('MainDropOffAddressUpdateComponent', () => {
  let component: MainPickUpAddressUpdateComponent;
  let fixture: ComponentFixture<MainDropOffAddressUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDropOffAddressUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDropOffAddressUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
