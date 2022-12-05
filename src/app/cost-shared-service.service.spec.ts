import { TestBed } from '@angular/core/testing';

import { CostSharedServiceService } from './cost-shared-service.service';

describe('CostSharedServiceService', () => {
  let service: CostSharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostSharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
