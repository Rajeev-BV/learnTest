import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CostSharedServiceService } from '../cost-shared-service.service';
import { DBService } from '../db.service';
import { EmployeetaxComponent } from '../employeetax/employeetax.component';
import { SalaryProcessService } from '../salary-process.service';
import { StaffSalaryProcessService } from '../staff-salary-process.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  empSalaryInfo : any[]=[];
  empTaxAmount:number=0;
  countOfWorkingdays :any[] = [];
  employeeType : any[] =[];
  netSalary  : number = 0;
  errorInfo:string='';
  employeeInfo: any[] = [];  

  constructor(public db:DBService, private costSharedService:CostSharedServiceService,
    private salaryProcesserService:SalaryProcessService) { }

  ngOnInit(): void {
    this.costSharedService.employeeIncomeTax.subscribe(
      tax => this.empTaxAmount = tax
    )         
  }
  ProcessSalary(employeeID:string){
    let empInfo: any[] = [];
    let grossSalary: number = 0;
    let netSalary: number = 0;
    let taxAmount: number = 0;
    let workingDays: number = 0;
    let salaryProcesserBasedOnEmployeeType: SalaryProcessService
    let age: number = 0;
    let empType: string = "";
    
    this.getEmployeeInfo(employeeID);
    age = this.employeeInfo[0].Age;
    empType = this.employeeInfo[0].Type

    //Based on employee type, get appropriate salary calculator
    salaryProcesserBasedOnEmployeeType = this.salaryProcessorFactory(empType);
    //Get Employee Salary //calculate gross salary    
    grossSalary = salaryProcesserBasedOnEmployeeType.calulateGrossSalary(employeeID)
   
    //Get Working Days
    this.countOfWorkingdays = this.db.getTimeSheetInfo(employeeID);
    //Get time sheet details for an employee   
    workingDays= this.countOfWorkingdays[0].Workingdays;    
    //Calculate Gross Salary for month
    grossSalary = grossSalary* workingDays;

    //calculate tax
    //TODO: can see a lot of combintions to test. Have a method in service
    //and set various combinations separately
    taxAmount = this.Tax(grossSalary, age);
    
    //calculate net salary
    netSalary = grossSalary - taxAmount;  
    //update DOM element
    this.netSalary = netSalary;
    
    //construct employee info for DB Save
    empInfo.push("Z001", "October", 2022, netSalary);  
    this.db.SaveData(empInfo);
 }

 Tax(grossSalary:number, Age:number):number {
  let taxslab :any[]=[];
  let taxAmount :number=0;

  taxslab = this.db.getTaxSlabs(Age);
  //TODO: Logic to compare Gross salary with tax slabs and get the right tax percent
  taxAmount = grossSalary * 0.1;
  //Publish the tax amount to tax component
  this.costSharedService.changeIncomeTax(taxAmount);
  return taxAmount;
}  

  getEmployeeInfo(employeeID : string){      
    this.db.getEmployeeInfo(employeeID).subscribe(
      (res:any[]) => { (this.employeeInfo = res)},

      (err: HttpErrorResponse) => {
        this.errorInfo = (err.statusText) ;
        return throwError(this.errorInfo)
      }     
    )    
  }  
  private salaryProcessorFactory(empType : string) : SalaryProcessService{
    switch(empType){
      case 'Plant':
        this.salaryProcesserService = new StaffSalaryProcessService(this.db);
    }    
    return this.salaryProcesserService;
  }
}
