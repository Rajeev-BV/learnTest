import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PlantSalaryProcessService } from './plant-salary-process.service';

describe('PlantSalaryProcessService', () => {
  let service: PlantSalaryProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PlantSalaryProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
