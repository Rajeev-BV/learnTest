import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DBService } from '../db.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  empType:any=[];
  employeeSalary : any[] = []
  employeeTimeSheet : any[] = []
  empNetSalary:number=0;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  needsLogin() {
    return !this.auth.isAuthenticated();
  }

  getEmployeeType():any[]{
   
    let name : any[] = []
    name = this.auth.getEmployeeInfo("AA");
    if (name.length == 0) {
      throw new Error('type shoud not be blank');
    }
    console.log("Name1" + name[0].Type);
    name.forEach(element => {
      console.log("Name" + element.Type);     
    });
    this.empType = name[0].Type;
    console.log("Name DOM" + this.empType); 
    
    
    return name;
    
  }

    getEmployeeSalary() : any[]{
      let empBasicSalaryComponents:any[]=[];
      this.employeeSalary = this.auth.getEmployeeSalaryInfo("AA");
      empBasicSalaryComponents = this.auth.getEmployeeSalaryInfo("AA");
      console.log("Basic Salary" + this.employeeSalary[0].Basic);
      console.log("HRA Salary" + this.employeeSalary[0].HRA);     
      return empBasicSalaryComponents;
  }

  getEmployeeTimeSheetInfo(): any[]{
    let empTimeSheetData:any[]=[];
    this.employeeTimeSheet = this.auth.getEmployeeTimeSheetInfo("AA");
    empTimeSheetData = this.auth.getEmployeeTimeSheetInfo("AA");
    console.log("Days Worked" + this.employeeTimeSheet[0].Workingdays);
    console.log("OT" + this.employeeTimeSheet[0].OT);  
    return empTimeSheetData;
  
}

processSalary():number{
  this.getEmployeeSalary();
  this.getEmployeeTimeSheetInfo()
  let grossSalary:number =0;
  let deductions:number=0;
  let basicSalary : number =0;
  let netSalary : number =0;
  let empBasicSalaryComponents : any[]=[];
  let empTimeSheetData : any[]=[];
  let empMonthlySalarydata:any[]=[];

  empBasicSalaryComponents = this.getEmployeeSalary();
  empTimeSheetData = this.getEmployeeTimeSheetInfo();

  //Calculate Gross salary
  grossSalary = this.getGrossSalary(empBasicSalaryComponents, empTimeSheetData);
  this.empNetSalary = grossSalary;

  //Calculate deductions
  deductions = this.getDeductions(basicSalary)

  //calculate net Salary
  netSalary = grossSalary - deductions;

  //prepare employee month salary data for Save
  empMonthlySalarydata = [{Empid : 'Z002', Month: 'Nov', Year: 2022, NetSalary: netSalary}]
  this.auth.saveEmpMonthSalaryToDB(empMonthlySalarydata);

  return netSalary   
}

getGrossSalary(empSalaryInfo:any[], empTimeSheetInfo:any[]): number{
  let grossSalary:number =0;
  grossSalary = (((empSalaryInfo[0].Basic ) +  (empSalaryInfo[0].HRA)) * 
  (empTimeSheetInfo[0].Workingdays));
  return grossSalary;
}

getDeductions(basicSalary:number):number{
  //PF
  //tax
  let tax:number =0;
  let empType:any[]=[];

  empType = this.getEmployeeType();
  tax = this.calculateTax(basicSalary, empType[0].Age, empType[0].Gender);
  return 0;
}

calculateTax(basicSalary:number, age:number, gender:string) : number{
  return 2500;
}

}
