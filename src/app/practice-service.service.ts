import { WeekDay } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PracticeServiceService {
  
  postToDB(firstNumber:number, secondNumber : number, operator:string, result :number) {
    throw new Error('Method not implemented.');
  }
  updateInventory(itemNumber: string, itemQuantity : number) {
    //throw new Error('Method not implemented.');
  }
  getItemPrice(itemNumber: string) : number {
    throw new Error('Method not implemented.');
  }
  getInventory(itemNumber : string) : number{
    throw new Error('Method not implemented.');
  }
  updateQuantity(itemStock: number, itemQuantity: number) {
    if (itemStock - itemQuantity < 0)
      throw ('Not Valid')
    return itemStock - itemQuantity;
  }

  constructor( private _http: HttpClient)  { }

  arthmeticOperation (operator : string, firstNumber : number, secondNumber : number) : number{
    let result : number = 0;
    if (secondNumber == 0){
      throw ("Cannot divide by zero");
    }
    if (operator == "+"){
      result=  firstNumber+ secondNumber;
    }else if (operator == "-")
    {
      result=  firstNumber - secondNumber;
    }
    else if (operator == "/")
    {
      result=  firstNumber / secondNumber;
    }
  
 
    return result
  }

  getOperator():Observable<any> {
    console.log("operatorService is called")
    return this._http.get('https://reqres.in/api/userlist');
  }

    getDayOfTheWeek() :  WeekDay  {
      throw new Error('Method not implemented.');
    }   
  

}
