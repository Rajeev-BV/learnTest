import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CostSharedServiceService } from '../cost-shared-service.service';
import { DBService } from '../db.service';
import { EmployeetaxComponent } from '../employeetax/employeetax.component';
import { PlantSalaryProcessService } from '../plant-salary-process.service';
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
  operator : string='';
  jsonDataResult?: any;
  tableRenderData?: any;

  constructor(public db:DBService, private costSharedService:CostSharedServiceService,
    private salaryProcesserService:SalaryProcessService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.costSharedService.employeeIncomeTax.subscribe(
      tax => this.empTaxAmount = tax
    )
    
    this.httpClient.get('/assets/operand.json').subscribe(
      res => {this.jsonDataResult = res;
       });
  }
  ProcessSalary(employeeID:string){
    let empInfo: any[] = [];
    let grossSalary: number = 0;
    let netSalary: number = 0;
    let taxAmount: number = 0;
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
   
    //calculate tax
    //TODO: can see a lot of combintions to test. Have a method in service
    //and set various combinations separately
    taxAmount = Math.floor(this.Tax(grossSalary*12, age)/12);
    console.log('tax:' + taxAmount);
    //taxAmount = grossSalary * 0.1;
    //Publish the tax amount to tax component
   this.costSharedService.changeIncomeTax(taxAmount);
    
    //calculate net salary
    netSalary = grossSalary - taxAmount;  
    //update DOM element
    this.netSalary = netSalary;
    
    //construct employee info for DB Save
    empInfo.push("Z001", "October", 2022, netSalary);  
    this.db.SaveData(empInfo);
 }

 onClick(): void{
  console.log('Clik Event' );

  this.ProcessSalary("Z002");
 }

 Tax(grossSalary:number, Age:number):number {
   let taxslab: any[] = [];
   let taxAmount: number = 0;

   taxslab = this.db.getTaxSlabs(Age);
   let txAmount: number = 0;
   let maxSlab: number = 0;

   //TODO: Logic to compare Gross salary with tax slabs and get the right tax percent
   for (var index in taxslab) {
     maxSlab = (taxslab[index].slabMax == 0) ? grossSalary + 2 : taxslab[index].slabMax
     if (grossSalary > taxslab[index].slabMin && grossSalary < maxSlab) {
       txAmount = txAmount + (grossSalary - taxslab[index].slabMin) * taxslab[index].taxPercent / 100
       break;
     }

     else {
       txAmount = txAmount + ((taxslab[index].slabMax) - (taxslab[index].slabMin)) * (taxslab[index].taxPercent) / 100

     }
   }
   taxAmount = txAmount;
   
   
   return taxAmount;
}  

  getEmployeeInfo(employeeID : string){      
    this.db.getEmployeeInfo(employeeID).subscribe(
      (res:any[]) => { (this.employeeInfo = res)},

      (err: HttpErrorResponse) => {
        this.errorInfo = ("AAAAA") ;
        //return throwError(this.errorInfo)
        //return ("AA")
      }     
    )    
  }  
  private salaryProcessorFactory(empType : string) : SalaryProcessService{
    switch (empType) {
      case 'Staff':
        this.salaryProcesserService = new StaffSalaryProcessService(this.db);
        break;
      case 'Plant':
        this.salaryProcesserService = new PlantSalaryProcessService(this.db);
        break;
    }
    return this.salaryProcesserService;
  }



  Operate(a: number, b: number) : number {
    let total: number =0;
    console.log("Operand")
    console.log("Operand")
   
       
       this.transformData(this.jsonDataResult)
      
    
      
      return total
       
  }

  transformData(jsonData:any){
    const op = this.jsonDataResult[0].value[0].operator;
  }



}


