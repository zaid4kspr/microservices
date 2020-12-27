import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConciergerieComponent } from './addConciergerie.component';

describe('ConciergerieComponent', () => {
  let component: AddConciergerieComponent;
  let fixture: ComponentFixture<AddConciergerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConciergerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConciergerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
