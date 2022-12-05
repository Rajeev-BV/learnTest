import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, observable, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private _http: HttpClient) { }

  SaveData(empInfo : any[]) {
    console.log("Service")
    //return []; //this._http.get('https://reqres.in/api/users');
  }

  getTaxSlabs(age:number):any[]{
    return [];
  }

  getSalaryInfo(employeeID : string) : any[]{
    console.log("Service")
    return [];// return this._http.get('https://reqres.in/api/users');
  }

  getTimeSheetInfo(employeeID : string) : any[]{
    console.log("Service")
    return [];//return this._http.get('https://reqres.in/api/users');
  }

  getEmployeeInfo(employeeID : string) : Observable<any>{
    console.log("Service EmpInfo")
    return (of({})).pipe( catchError((err: HttpErrorResponse) => {
      return throwError(err.statusText);
    }))
   
    //return this._http.get('https://reqres.in/api/users');
    
    //return EMPTY;
  }

 
}
