import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SalaryProcessService } from './salary-process.service';

describe('SalaryProcessService', () => {
  let service: SalaryProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({  imports: [HttpClientTestingModule],
      providers: [SalaryProcessService],});
    service = TestBed.inject(SalaryProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
