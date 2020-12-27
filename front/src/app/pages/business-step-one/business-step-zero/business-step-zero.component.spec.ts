import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessStepZeroComponent } from './business-step-zero.component';

describe('BusinessStepZeroComponent', () => {
  let component: BusinessStepZeroComponent;
  let fixture: ComponentFixture<BusinessStepZeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessStepZeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessStepZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
