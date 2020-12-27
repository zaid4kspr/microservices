import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareYourPositionWhithDriverComponent } from './share-your-position-whith-driver.component';

describe('ShareYourPositionWhithDriverComponent', () => {
  let component: ShareYourPositionWhithDriverComponent;
  let fixture: ComponentFixture<ShareYourPositionWhithDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareYourPositionWhithDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareYourPositionWhithDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
