import { TestBed } from '@angular/core/testing';

import { PackagingSlipService } from './packaging-slip.service';

describe('PackagingSlipService', () => {
  let service: PackagingSlipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagingSlipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
