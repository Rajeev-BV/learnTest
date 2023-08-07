import { Component, OnInit } from '@angular/core';
import { PracticeServiceService } from '../practice-service.service';
import { WeekDay } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.less']
})
export class PracticeComponent implements OnInit {
  errorInfo: any;
   
 
  orderItem(itemNumber: string, itemQuantity: number) {
    let itemStock : number ;
    itemStock = this.service.getInventory(itemNumber)
    try
    {
      
      this.service.updateQuantity(itemStock, itemQuantity)
      this.service.updateInventory(itemNumber, itemStock-itemQuantity)
    }
    catch(e)
    {
      this.errorInfo = e
    }
    
  }

  result : number = 0;
  opertor : any[]=[];
  itemPrice : number =0;
  operatorInfo : IOperator[] = [];

  constructor(private service : PracticeServiceService) { 
    
   
  }

  ngOnInit(): void {
   
  }

  arithmeticOperation(firstNumber : number, secondNumber: number)  {    
    //this.opertor= this.service.getOperator()
    try{
      this.fetchOperatorInfoFromService()       
      //this.result = this.service.arthmeticOperation(this.opertor[0].Operator, firstNumber, secondNumber)
      this.result = this.service.arthmeticOperation(this.operatorInfo[0].Operator, firstNumber, secondNumber)
      //this.service.postToDB(firstNumber, secondNumber,this.opertor[0].Operator, this.result )
      this.service.postToDB(firstNumber, secondNumber,this.operatorInfo[0].Operator, this.result )
  }
  catch (e){
    
    this.errorInfo = e;
    
  }
  }

  fetchOperatorInfoFromService(){
    this.service.getOperator().subscribe((res) => {
      (this.operatorInfo = res)     
    },
    (err:HttpErrorResponse) => {
      this.errorInfo = ("Invalid data")
    })
  }

  calculateNetPrice(itemNumber :string) : number {
   
    this.itemPrice = this.service.getItemPrice(itemNumber)
    let dayOfTheWeek : WeekDay;
    dayOfTheWeek = this.service.getDayOfTheWeek();
    //var today = dayOfTheWeek.getDay();
    if (dayOfTheWeek == WeekDay.Saturday || dayOfTheWeek == WeekDay.Sunday)
    {
      this.itemPrice = this.itemPrice * 1.2;
    }
    return this.itemPrice;

  }


}

export interface IOperator{
  Operator:string;
 }


