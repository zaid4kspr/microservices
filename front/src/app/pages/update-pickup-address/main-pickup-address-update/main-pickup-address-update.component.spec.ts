import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPickUpAddressUpdateComponent } from './main-pickup-address-address.component';

describe('MainPickUpAddressUpdateComponent', () => {
  let component: MainPickUpAddressUpdateComponent;
  let fixture: ComponentFixture<MainPickUpAddressUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPickUpAddressUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPickUpAddressUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
