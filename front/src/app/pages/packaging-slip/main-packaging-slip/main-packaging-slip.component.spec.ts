import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPackagingSlipComponent } from './main-packaging-slip.component';

describe('MainPackagingSlipComponent', () => {
  let component: MainPackagingSlipComponent;
  let fixture: ComponentFixture<MainPackagingSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPackagingSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPackagingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
