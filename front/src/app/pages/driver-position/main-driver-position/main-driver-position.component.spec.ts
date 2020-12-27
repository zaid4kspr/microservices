import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDriverPositionComponent } from './main-driver-position.component';

describe('MainDriverPositionComponent', () => {
  let component: MainDriverPositionComponent;
  let fixture: ComponentFixture<MainDriverPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDriverPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDriverPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
