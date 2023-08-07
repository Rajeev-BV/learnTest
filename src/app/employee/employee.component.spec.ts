import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';
import { DBService } from '../db.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, throwError } from 'rxjs';
import { CostSharedServiceService } from '../cost-shared-service.service';
import { EmployeetaxComponent } from '../employeetax/employeetax.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataserviceService } from '../dataservice.service';
import { SalaryProcessService } from '../salary-process.service';



export class DBServiceStub {
  employeeInfo: any[] = [];  
  SaveData(empInfo:string[]) {
    return of({
      id:0
    });
  }

  getSalaryInfo(employeeID : string){
    return of ({
      empSalaryInfo : [
        {Basic_Salary: 1000, HRA:120, Allowance: 600}
      ]
    });
  }

  getTimeSheetInfo(employeeID : string){
    return of ({
      empSalaryInfo : [
        {Workingdays: 20}
      ]
    });
  }
}

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let fixture1:ComponentFixture<EmployeetaxComponent>;
  let component1:EmployeetaxComponent;
  let service : DBService;
  let service2 : DBService;
  let costsharedservice: CostSharedServiceService;
  let salaryProcessor: SalaryProcessService;
  let _http: HttpClient;
  let spy: any;
  let taxslab : any[]=[];
  let employeeInfo_Staff: any[]=[] ; 
  let employeeInfo_Plant: any[]=[] ; 
  

  //let employeeInfo: Observable<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ EmployeeComponent, EmployeetaxComponent ],
      //providers: [{ provide: DBService, useClass: DBServiceStub}],
   })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(DBService);   
    costsharedservice = fixture.debugElement.injector.get(CostSharedServiceService);
    salaryProcessor = fixture.debugElement.injector.get(SalaryProcessService);
    component = fixture.componentInstance;  
    fixture.detectChanges();
  
    employeeInfo_Staff = [{ ID: 'Z001', Age: 45, Gender: 'M', Type: 'Staff' }];
    employeeInfo_Plant = [{ ID: 'Z002', Age: 45, Gender: 'M', Type: 'Plant' }];
   
    taxslab = [
      {slabMin : 0, slabMax:300000, taxPercent:0},
      {slabMin:300000, slabMax: 500000, taxPercent:10},
      {slabMin:500000,slabMax: 1000000,  taxPercent:20},  
      {slabMin:1000000,slabMax: 0,  taxPercent:30},     
      
    ]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 

  it('should validate tax calculation', () => {
    
    spy = spyOn(service, 'getTaxSlabs').and.returnValue(taxslab);

    [ {salary:200000, tax :0},
      {salary:600000, tax :40000},
      {salary:1200000, tax :180000},
      ].forEach(({salary,tax} ) => {
        expect(component.Tax(salary, 45)).toEqual(tax)
      })
  });
 
  fit('should throw db exception', () => {
    const mockErrorResponse = { statusText: 'Bad Request' } as HttpErrorResponse
    const http = TestBed.inject(HttpClient);
    let employeeInfo: any[] = [];  
    spyOn(http, 'get').and.returnValue(throwError(() => mockErrorResponse))
    //const mockErrorResponse = { statusText: 'Bad Request' } as HttpErrorResponse
    //spyOn(service, 'getEmployeeInfo').and.returnValue(throwError(() => mockErrorResponse));
    //service2 = new DBService(http);
    //service.getEmployeeInfo("Z001").subscribe(
    ///(res:any[]) => { (employeeInfo = res)})

    component.getEmployeeInfo('Z001');
    expect(component.errorInfo).toBe(mockErrorResponse.statusText); 
  });

  it('should operate', () => {
    
    expect(component.Operate(4,5)).toBe(9);
  })


  it('should call Process Salary for Staff Worker', () => {
    let empInfo: any[] = [];
    let empSalaryInfo: any[] = []
    let empTimeSheetInfoInfo: any[] = []

    empInfo.push("Z001", "October", 2022, 50187);

    spy = spyOn(service, 'getEmployeeInfo').and.returnValue(of(employeeInfo_Staff));
 
    empSalaryInfo = [{ Basic_Salary: 2000, HRA: 120, Allowance: 600 }];
    spy = spyOn(service, 'getSalaryInfo').and.returnValue((empSalaryInfo));

    empTimeSheetInfoInfo = [{ Workingdays: 20 }];
    spy = spyOn(service, 'getTimeSheetInfo').and.returnValue(empTimeSheetInfoInfo);
    fixture.detectChanges();

    spyOn(service, 'SaveData').withArgs(empInfo).and.callThrough();
    fixture.detectChanges();

    spy = spyOn(service, 'getTaxSlabs').and.returnValue(taxslab);

    component.ProcessSalary("Z001");
    fixture.detectChanges();

    expect(service.SaveData).toHaveBeenCalled();
   
  });

  it('should call Process Salary for Plant Worker', () => {
    let empInfo: any[] = [];
    let empSalaryInfo: any[] = []
    let empTimeSheetInfoInfo: any[] = []

    empInfo.push("Z001", "October", 2022, 53387);

    spy = spyOn(service, 'getEmployeeInfo').and.returnValue(of(employeeInfo_Plant));
 
    empSalaryInfo = [{ Basic_Salary: 2000, HRA: 120, Allowance: 600 }];
    spy = spyOn(service, 'getSalaryInfo').and.returnValue((empSalaryInfo));

    empTimeSheetInfoInfo = [{ Workingdays: 20, OTHours : 2 }];
    spy = spyOn(service, 'getTimeSheetInfo').and.returnValue(empTimeSheetInfoInfo);
    fixture.detectChanges();

    spyOn(service, 'SaveData').withArgs(empInfo).and.callThrough();
    fixture.detectChanges();

    spy = spyOn(service, 'getTaxSlabs').and.returnValue(taxslab);

    component.ProcessSalary("Z001");
    fixture.detectChanges();

    expect(service.SaveData).toHaveBeenCalled();
   
  });

  it('should update the income tax to DOM - Behavior Subject', fakeAsync( () => {
    let empInfo: any[] = [];
    let empSalaryInfo: any[] = []
    let empTimeSheetInfoInfo: any[] = []

    spy = spyOn(service, 'getEmployeeInfo').and.returnValue(of(employeeInfo_Staff));

    empSalaryInfo = [{ Basic_Salary: 2000, HRA: 120, Allowance: 600 }];
    spy = spyOn(service, 'getSalaryInfo').and.returnValue((empSalaryInfo));

    empTimeSheetInfoInfo = [{ Workingdays: 20 }];
    spy = spyOn(service, 'getTimeSheetInfo').and.returnValue(empTimeSheetInfoInfo);
    fixture.detectChanges();

    spy = spyOn(service, 'getTaxSlabs').and.returnValue(taxslab);

    component.ProcessSalary("Z001");
    fixture1 = TestBed.createComponent(EmployeetaxComponent);
    fixture1.detectChanges();
    component1 = fixture1.componentInstance;
    fixture1.detectChanges();
    let title = fixture1.debugElement.query(By.css('p')).nativeElement; 
    fixture1.detectChanges();
    title.dispatchEvent(new Event('input'));
    tick();
    fixture1.detectChanges();
    expect(fixture1.debugElement.query(By.css('p')).nativeElement.innerHTML).toEqual('4213');
   
  }));

  it('should update the Net Salary tax to DOM - Integration test example', fakeAsync( () => {

    let empSalaryInfo: any[] = []
    let empTimeSheetInfoInfo: any[] = []

    spy = spyOn(service, 'getEmployeeInfo').and.returnValue(of(employeeInfo_Staff));

    empSalaryInfo = [{ Basic_Salary: 2000, HRA: 120, Allowance: 600 }];
    spy = spyOn(service, 'getSalaryInfo').and.returnValue((empSalaryInfo));

    empTimeSheetInfoInfo = [{ Workingdays: 20 }];
    spy = spyOn(service, 'getTimeSheetInfo').and.returnValue(empTimeSheetInfoInfo);
    fixture.detectChanges();

    spy = spyOn(service, 'getTaxSlabs').and.returnValue(taxslab);

    //component.ProcessSalary("Z001"); 
    const button = fixture.debugElement.query(By.css('[data-testid="btnprocesssalary"]'))
    fixture.detectChanges();
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css('p')).nativeElement; 
    fixture.detectChanges();
    title.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('p')).nativeElement.innerHTML).toEqual('50187');
   
  }));

});
