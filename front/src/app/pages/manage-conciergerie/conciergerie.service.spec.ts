import { TestBed } from '@angular/core/testing';

import { ConciergerieService } from './conciergerie.service';

describe('ConciergerieService', () => {
  let service: ConciergerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConciergerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
