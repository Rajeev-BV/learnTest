import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { elementAt, Observable, observable, of } from 'rxjs';
import { StudentsService } from '../student.service';
import { StudentComponent } from './student.component';

export class StudentsServiceStub {
  getUserList() {
    return of({
      data: [
        { id: 1, first_name: 'George', last_name: 'Bluth', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' },
        { id: 2, first_name: 'Janet', last_name: 'Weaver', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg' },
        { id: 3, first_name: 'Emma', last_name: 'Wong', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg' },
      ],
    });
  }
  filterValueList(){

  }
}

describe('StudentComponent', () => {  
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let list:[];
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [StudentComponent],
      providers: [{ provide: StudentsService, useClass: StudentsServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    list = [];
    fixture.detectChanges();
  });

 
  it('should have "user_list" populated ', () => {
    
    console.debug("Data length" + component.user_list.length)
    expect(component.user_list.length).toBeGreaterThan(0);
  });

  it('should call getUserList() of StudentService on component Init', () => {
    //spyOn(component._userService, 'getUserList').and.callThrough();
    spyOn(component._userService,'getUserList').and.returnValue(getListOfUsers());
    component.ngOnInit();
    fixture.detectChanges();  
    expect(component._userService.getUserList).toHaveBeenCalled();
    });

  it('should call filter the list', () => {
    
    spyOn(component._userService,'filterValueList').and.returnValue(getLimit1());
    component.ngOnInit();
    component.FilterList();
    expect(component._userService.filterValueList).toHaveBeenCalled();
     });

  it('should call compare the list', () => {
   
      getListOfUsers().subscribe((data) => {
      list=data.data;      
      });
    
     console.debug("AAAAAA" + list.length);
    expect(component.CompareList(list, 5)).toEqual('3');
  });

  it('should call final count', fakeAsync( () => {
    component.ngOnInit();
    //await fixture.whenStable();
    fixture.detectChanges();  
    let title = fixture.debugElement.query(By.css('p')).nativeElement;  
    
    fixture.detectChanges();  
    title.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();  
    //console.debug
    expect(fixture.debugElement.query(By.css('p')).nativeElement.innerHTML).toEqual('3');
   
  }));

});
function getListOfUsers(): Observable<any> {
  {
    return of({
      data: [
        { id: 1, first_name: 'George', last_name: 'Bluth', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' },
        { id: 2, first_name: 'Janet', last_name: 'Weaver', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg' },
        { id: 3, first_name: 'Emma', last_name: 'Wong', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg' },
      ],
    });
  }
}
  function getLimit1() {
    {
      return of({
        x: 5
      });
    }
}



