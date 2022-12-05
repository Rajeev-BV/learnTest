import { Injectable } from '@angular/core';
import { DBService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export abstract class SalaryProcessService {

  constructor(public db:DBService) { }

  abstract calulateGrossSalary(employeeID:string):number
}
