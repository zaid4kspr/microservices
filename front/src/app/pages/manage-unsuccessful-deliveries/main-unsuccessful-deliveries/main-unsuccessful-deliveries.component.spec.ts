import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUnsuccessfulDeliveriesComponent } from './main-unsuccessful-deliveries.component';

describe('MainUnsuccessfulDeliveriesComponent', () => {
  let component: MainUnsuccessfulDeliveriesComponent;
  let fixture: ComponentFixture<MainUnsuccessfulDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainUnsuccessfulDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUnsuccessfulDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
