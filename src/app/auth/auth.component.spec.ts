import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ɵNgNoValidate } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth.service';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let service : AuthService;
  let fixture: ComponentFixture<AuthComponent>;
  let spy: any;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ AuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    //service = new AuthService();
    //component = new AuthComponent(service);  
    fixture = TestBed.createComponent(AuthComponent);
    service = fixture.debugElement.injector.get(AuthService); 
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should update the Net Salary to DOM - integration test', fakeAsync( () => {
    let employeeInfo : any[]=[];
    employeeInfo = [{Type: 'Plant', Age: 45, Gender: 'M'}];
    spy = spyOn(service, 'getEmployeeInfo').and.returnValue(employeeInfo);

    let employeeSalaryInfo : any[]=[];
    employeeSalaryInfo = [{Basic: 5000, HRA : 2000}];
    spy = spyOn(service, 'getEmployeeSalaryInfo').and.returnValue(employeeSalaryInfo);
    //component.getEmployeeSalary();

    let employeeTimeSheetInfo : any[]=[];
    employeeTimeSheetInfo = [{Workingdays: 20, OT : 3, Late : 0}];
    spy = spyOn(service, 'getEmployeeTimeSheetInfo').and.returnValue(employeeTimeSheetInfo);

    const de = fixture.debugElement;
    const button = de.query(By.css('[data-testid="btn"]'))
    fixture.detectChanges()
    button.triggerEventHandler('click', null);
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerHTML).toEqual('140000');

  }));

  it('should update the employee type to DOM', fakeAsync( () => {
    let employeeInfo : any[]=[];
    employeeInfo = [{Type: 'Plant', Age: 45, Gender: 'M'}];
    spy = spyOn(service, 'getEmployeeInfo').and.returnValue(employeeInfo);
    component.getEmployeeType();
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css('p')).nativeElement.innerHTML; 
    fixture.detectChanges();
    console.log("Updated DOM" + title)
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('p')).nativeElement.innerHTML).toEqual('Plant');
   
  }));  

  afterEach(() => { (2)
    localStorage.removeItem('token');
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('needsLogin returns true when the user has not been authenticated', () => {
    spy = spyOn(service, 'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    expect(service.isAuthenticated).toHaveBeenCalled(); 
  });



  it('calls getEmployeeInfo', () => {
    let employeeInfo : any[]=[];
    employeeInfo = [{Type: 'Plant'}];
    spy = spyOn(service, 'getEmployeeInfo').and.returnValue(employeeInfo);
    component.getEmployeeType();
    expect(service.getEmployeeInfo).toHaveBeenCalled(); 
    //expect(function (){component.getEmployeeType();}).toThrowError('Server not found');
  });

  it('show throw error if employee type is empty', () => {
    let employeeInfo : any[]=[];
    employeeInfo = [{Type: ''}];
    expect(function (){component.getEmployeeType();}).toThrowError('type shoud not be blank');
  })
  
  it('calls getEmployeeSalaryInfo', () => {
    let employeeSalaryInfo : any[]=[];
    employeeSalaryInfo = [{Basic: 5000, HRA : 2000}];
    spy = spyOn(service, 'getEmployeeSalaryInfo').and.returnValue(employeeSalaryInfo);
    component.getEmployeeSalary();
    expect(service.getEmployeeSalaryInfo).toHaveBeenCalled(); 
  });

  it('needsLogin returns false when the user has been authenticated', () => {
    localStorage.setItem('token', '12345'); (3)
    expect(component.needsLogin()).toBeFalsy();
  });

  it('needs to validate if Save is called with right values', () => {

    let empMonthlySalaryInfo : any[]=[]
    empMonthlySalaryInfo = [{Empid : 'Z002', Month: 'Nov', Year: 2022, NetSalary: 140000}]

    let employeeInfo : any[]=[];
    employeeInfo = [{Type: 'Plant', Age: 45, Gender: 'M'}];
    spy = spyOn(service, 'getEmployeeInfo').and.returnValue(employeeInfo);

    let employeeSalaryInfo : any[]=[];
    employeeSalaryInfo = [{Basic: 5000, HRA : 2000}];
    spy = spyOn(service, 'getEmployeeSalaryInfo').and.returnValue(employeeSalaryInfo);
    
    let employeeTimeSheetInfo : any[]=[];
    employeeTimeSheetInfo = [{Workingdays: 20, OT : 3, Late : 0}];
    spy = spyOn(service, 'getEmployeeTimeSheetInfo').and.returnValue(employeeTimeSheetInfo);
    
    spyOn(service, 'saveEmpMonthSalaryToDB').withArgs(empMonthlySalaryInfo).and.callThrough();

    let grossSalary:number=0;
    grossSalary = component.processSalary();
    console.log("Gross Sal from spec" + grossSalary)

    expect(grossSalary).toEqual(140000);
    expect(service.saveEmpMonthSalaryToDB).toHaveBeenCalled();

  });



});
