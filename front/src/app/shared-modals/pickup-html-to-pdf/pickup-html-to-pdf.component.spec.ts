import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpHtmlToPdfComponent } from './pickup-html-to-pdf.component';

describe('PickUpHtmlToPdfComponent', () => {
  let component: PickUpHtmlToPdfComponent;
  let fixture: ComponentFixture<PickUpHtmlToPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickUpHtmlToPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpHtmlToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
