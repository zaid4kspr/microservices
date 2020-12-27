import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsBadgeStatusComponent } from './jobs-badge-status.component';

describe('JobsBadgeStatusComponent', () => {
  let component: JobsBadgeStatusComponent;
  let fixture: ComponentFixture<JobsBadgeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsBadgeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsBadgeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
