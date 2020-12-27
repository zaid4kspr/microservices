import { TestBed } from '@angular/core/testing';

import { ManageDeliveryService } from './manage-delivery.service';

describe('ManageDeliveryService', () => {
  let service: ManageDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
