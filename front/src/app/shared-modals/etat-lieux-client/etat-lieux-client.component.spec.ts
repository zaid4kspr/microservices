import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatLieuxClientComponent } from './etat-lieux-client.component';

describe('EtatLieuxClientComponent', () => {
  let component: EtatLieuxClientComponent;
  let fixture: ComponentFixture<EtatLieuxClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatLieuxClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatLieuxClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
