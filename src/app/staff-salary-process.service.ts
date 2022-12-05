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
    empSalaryInfo = this.db.getSalaryInfo(employeeID);
    grossSalary = (empSalaryInfo[0].HRA +
      empSalaryInfo[0].Basic_Salary +
      empSalaryInfo[0].Allowance)

    return grossSalary;
  }
}
