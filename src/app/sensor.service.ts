import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  sensorRange : string[] = [];

  constructor(private _http: HttpClient) { }

   getSensorList(vendorID : string, sensorState  : string): Observable<any> {
    console.log("Senso service");
    return this._http.get('https://reqres.in/api/users');
    //return "aa";
  }

  getSensorRange(sensorID: string) : Observable<any>{
    return this._http.get('https://reqres.in/api/users');
  }
}
