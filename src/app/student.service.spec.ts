import { TestBed, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentsService } from './student.service';


const dummyUserListResponse = {
  data: [
    { id: 1, first_name: 'George', last_name: 'Bluth', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' },
    { id: 2, first_name: 'Janet', last_name: 'Weaver', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg' },
    { id: 3, first_name: 'Emma', last_name: 'Wong', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg' },
  ],
};
let result : any;

describe('StudentService', () => {
  let injector: TestBed;
  let service: StudentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService],
    });

    injector = getTestBed();
    service = injector.get(StudentsService);
    httpMock = injector.get(HttpTestingController);
    //TestBed.inject(HttpTestingController);
    
  });

  afterEach(() => {
    httpMock.verify();
  });

  fit('getUserList() should return data', () => {
    service.getUserList().subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
     
    });
    console.log("Return" + result);
    const req = httpMock.expectOne('https://reqres.in/api/userlist');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
    
  });
 
});
