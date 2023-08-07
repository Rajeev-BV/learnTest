import { TestBed, getTestBed } from '@angular/core/testing';

import { PracticeServiceService } from './practice-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const response = {
  data: [
    {
      operator : "+"
    },
   
  ],
};

describe('PracticeServiceService', () => {
  let injector: TestBed;
  let service: PracticeServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers : [PracticeServiceService],
    });
    injector = getTestBed();
    service = injector.get(PracticeServiceService);
    httpMock = injector.get(HttpTestingController);
  
   
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit ('should validate addition of two numbers', () => {
   
    expect(service.arthmeticOperation("+", 5,4)).toEqual(9);
  })

  fit('it should get the operator from service', () => {
    service.getOperator().subscribe( data => {  
     
      expect(data.data).toEqual(response.data);
    })
    const req = httpMock.expectOne('https://reqres.in/api/userlist');
    expect(req.request.method).toBe('GET');
    req.flush(response);
      
  })

});
