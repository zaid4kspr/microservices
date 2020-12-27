import { TestBed } from '@angular/core/testing';

import { UnsuceessfulDelivService } from './unsuceessful-deliv.service';

describe('UnsuceessfulDelivService', () => {
  let service: UnsuceessfulDelivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsuceessfulDelivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
