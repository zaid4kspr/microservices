import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPermissionComponent } from './main-permission.component';

describe('MainPermissionComponent', () => {
  let component: MainPermissionComponent;
  let fixture: ComponentFixture<MainPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
