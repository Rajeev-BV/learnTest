import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private _http: HttpClient) {}
  x:number =0;
  getUserList(): Observable<any> {
    //return EMPTY;
    //return this._http.get('https://reqres.in/api/users');
    console.log("hi student");
    return this._http.get('https://reqres.in/api/userlist');
  }

  filterValueList():Observable<any>  {
    return new Observable(obs => obs.next(this.x));
  }

  
}