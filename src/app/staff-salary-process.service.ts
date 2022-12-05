import { Injectable } from '@angular/core';
import { DBService } from './db.service';
import { SalaryProcessService } from './salary-process.service';

@Injectable({
  providedIn: 'root'
})
export class StaffSalaryProcessService extends SalaryProcessService {

  constructor(public override  db: DBService) {
    super(db);
  }

  public calulateGrossSalary(employeeID: string): number {
    let grossSalary: number;
    let empSalaryInfo: any[] = [];
    let countOfWorkingdays : any[]=[];
    let workingDays : number;

    empSalaryInfo = this.db.getSalaryInfo(employeeID);
    grossSalary = (empSalaryInfo[0].HRA +
      empSalaryInfo[0].Basic_Salary +
      empSalaryInfo[0].Allowance)

      //Get Working Days
    countOfWorkingdays = this.db.getTimeSheetInfo(employeeID);
    //Get time sheet details for an employee   
    workingDays= countOfWorkingdays[0].Workingdays;    
    //Calculate Gross Salary for month
    grossSalary = grossSalary* workingDays;

    return grossSalary;
  }
}
