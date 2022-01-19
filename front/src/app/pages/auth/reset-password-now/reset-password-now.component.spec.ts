import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordNowComponent } from './reset-password-now.component';

describe('ResetPasswordNowComponent', () => {
  let component: ResetPasswordNowComponent;
  let fixture: ComponentFixture<ResetPasswordNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
