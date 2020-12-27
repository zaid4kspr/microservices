import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingHtmlToPdfComponent } from './packaging-html-to-pdf.component';

describe('PackagingHtmlToPdfComponent', () => {
  let component: PackagingHtmlToPdfComponent;
  let fixture: ComponentFixture<PackagingHtmlToPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagingHtmlToPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingHtmlToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
