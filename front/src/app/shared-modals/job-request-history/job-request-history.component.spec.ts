import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRequestHistoryComponent } from './job-request-history.component';

describe('JobRequestHistoryComponent', () => {
  let component: JobRequestHistoryComponent;
  let fixture: ComponentFixture<JobRequestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRequestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
