import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPickupsComponent } from './list-pickups.component';

describe('ListPickupsComponent', () => {
  let component: ListPickupsComponent;
  let fixture: ComponentFixture<ListPickupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPickupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
