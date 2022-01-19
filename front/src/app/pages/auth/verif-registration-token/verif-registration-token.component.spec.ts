import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifRegistrationTokenComponent } from './verif-registration-token.component';

describe('VerifRegistrationTokenComponent', () => {
  let component: VerifRegistrationTokenComponent;
  let fixture: ComponentFixture<VerifRegistrationTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifRegistrationTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifRegistrationTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
