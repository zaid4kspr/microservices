import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBusinessStepOneComponent } from './main-business-step-one.component';

describe('MainBusinessStepOneComponent', () => {
  let component: MainBusinessStepOneComponent;
  let fixture: ComponentFixture<MainBusinessStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBusinessStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBusinessStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
