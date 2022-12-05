import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostSharedServiceService {
  CostOfSensors = new BehaviorSubject(1);
  currentCost = this.CostOfSensors.asObservable();

  IncomeTax = new BehaviorSubject(1);
  employeeIncomeTax = this.IncomeTax.asObservable();

  constructor() { }

  public changeCost(TotalCost : number) : void
  {
    this.CostOfSensors.next(TotalCost)
  }

  public changeIncomeTax(TotalCost : number) : void
  {
    this.IncomeTax.next(TotalCost)
  }

}
