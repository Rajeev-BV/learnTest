import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StaffSalaryProcessService } from './staff-salary-process.service';

describe('StaffSalaryProcessService', () => {
  let service: StaffSalaryProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({  imports: [HttpClientTestingModule],
      providers: [StaffSalaryProcessService],});
    service = TestBed.inject(StaffSalaryProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
