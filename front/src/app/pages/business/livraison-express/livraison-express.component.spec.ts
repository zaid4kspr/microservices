import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonExpressComponent } from './livraison-express.component';

describe('LivraisonExpressComponent', () => {
  let component: LivraisonExpressComponent;
  let fixture: ComponentFixture<LivraisonExpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivraisonExpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivraisonExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
