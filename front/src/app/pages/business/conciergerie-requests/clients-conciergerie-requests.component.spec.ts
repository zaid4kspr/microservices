import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsConciergerieRequestsComponent } from './clients-conciergerie-requests';

describe('ConciergerieRequestsComponent', () => {
  let component: ClientsConciergerieRequestsComponent;
  let fixture: ComponentFixture<ClientsConciergerieRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsConciergerieRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsConciergerieRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
