import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciergerieRequestsComponent } from './conciergerie-requests.component';

describe('ConciergerieRequestsComponent', () => {
  let component: ConciergerieRequestsComponent;
  let fixture: ComponentFixture<ConciergerieRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciergerieRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciergerieRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
