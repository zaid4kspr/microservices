import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciergerieNotifItemComponent } from './conciergerie-notif-item.component';

describe('ConciergerieNotifItemComponent', () => {
  let component: ConciergerieNotifItemComponent;
  let fixture: ComponentFixture<ConciergerieNotifItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciergerieNotifItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciergerieNotifItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
