import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLinkComponent } from './register-link.component';

describe('RegisterLinkComponent', () => {
  let component: RegisterLinkComponent;
  let fixture: ComponentFixture<RegisterLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
