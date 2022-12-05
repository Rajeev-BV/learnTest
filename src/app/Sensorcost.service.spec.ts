import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { CostService } from './Sensorcost.service';

describe('CostService', () => {
  let service: CostService;
  let injector: TestBed;
   let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CostService],
    });

    injector = getTestBed();
    service = injector.get(CostService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 
  



});
