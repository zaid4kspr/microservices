import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNotifListComponent } from './main-notif-list.component';

describe('MainNotifListComponent', () => {
  let component: MainNotifListComponent;
  let fixture: ComponentFixture<MainNotifListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNotifListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNotifListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
