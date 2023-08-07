import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, observable, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  operand : string[] = []
  
  constructor(private _http: HttpClient) { }
  private readonly URL: string = `http://localhost:3000/customers`
  private _jsonURL:string = '/assets/operand.json'
  private jsonStr: string = '{"operator":"+"}'
  

  SaveData(empInfo : any[]) {
    console.log("Service")
    //return []; //this._http.get('https://reqres.in/api/users');
  }
  

  getTaxSlabs(age:number):any[] {
    console.log("Service")
    return [];
    //return this._http.get<any[]>(this.URL);
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
    return this._http.get('https://reqres.in/api/users')
    //return (of({})).pipe( catchError((err: HttpErrorResponse) => {
    //  return throwError(err.statusText);
    return EMPTY;
    }

    getOperand() : Observable<any>{
      //console.log(" ServiceOperand");
      return this._http.get(this._jsonURL);
      //let jsonObj = JSON.parse(this.jsonStr)
      //return jsonObj;
     // return EMPTY;
    }
    //))
   
    //return this._http.get('https://reqres.in/api/users');
    
    //return EMPTY;
  }

 

