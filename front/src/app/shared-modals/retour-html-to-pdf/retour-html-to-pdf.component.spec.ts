import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourHtmlToPdfComponent } from './retour-html-to-pdf.component';

describe('PickUpHtmlToPdfComponent', () => {
  let component: RetourHtmlToPdfComponent;
  let fixture: ComponentFixture<RetourHtmlToPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetourHtmlToPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetourHtmlToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
