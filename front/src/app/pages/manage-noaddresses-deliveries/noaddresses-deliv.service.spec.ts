import { TestBed } from '@angular/core/testing';

import { NoaddressesDelivService } from './main-noaddresses-deliveries';

describe('NoaddressesDelivService', () => {
  let service: NoaddressesDelivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoaddressesDelivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
