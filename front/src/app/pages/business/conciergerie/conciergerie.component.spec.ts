import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciergerieComponent } from './conciergerie.component';

describe('ConciergerieComponent', () => {
  let component: ConciergerieComponent;
  let fixture: ComponentFixture<ConciergerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciergerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciergerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
