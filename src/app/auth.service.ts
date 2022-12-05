import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    console.log("Auth");
    return !!localStorage.getItem('token');
  }

  getEmployeeInfo(employeeID : string):any[]{
    console.log("Auth Emp");
    return [];  
  }

  getEmployeeSalaryInfo(employeeID : string):any[]{
    console.log("Auth Emp");
    return [];
}

getEmployeeTimeSheetInfo(employeeID : string):any[]{
  console.log("Auth Emp");
  return [];
}

saveEmpMonthSalaryToDB(empMonthlySalaryInof:any[]){
  return [];
}

}
