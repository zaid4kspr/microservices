import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonStatsComponent } from './livraison-stats.component';

describe('LivraisonStatsComponent', () => {
  let component: LivraisonStatsComponent;
  let fixture: ComponentFixture<LivraisonStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivraisonStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivraisonStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
