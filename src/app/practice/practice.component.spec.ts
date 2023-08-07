import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeComponent } from './practice.component';
import { PracticeServiceService } from '../practice-service.service';
import {mockAddOperator, mockSubOperator} from './mock-data'
import { of, throwError } from 'rxjs';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


describe('PracticeComponent', () => {
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;
  let service : PracticeServiceService;
  let result : number =0;
  let operatorsInfo : any[] ;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ PracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(PracticeServiceService)
   
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should call service aritmetic operations', ()=> {
     [
      {operator: mockAddOperator, firstNumber: 5, secondNumber:4, expectedResult:9  },
      {operator: mockSubOperator, firstNumber: 5, secondNumber:4, expectedResult:1  }
    ].forEach(({operator, firstNumber, secondNumber, expectedResult}) =>{
    
      service.getOperator = jasmine.createSpy().and.returnValue(operator)
      component.arithmeticOperation(firstNumber,secondNumber);
      expect(service.getOperator).toHaveBeenCalled();
      expect(component.result).toBe(expectedResult);

    }
    )   

  })

  fit ('should call service Math operations', ()=> {   
    let operator_data: any[]=[] ;  
    operator_data = [{Operator: '/' }];
    service.getOperator = jasmine.createSpy().and.returnValue(of(operator_data))
    //spyOn(service, 'getOperator').and.returnValue(of(operator_data));
    component.arithmeticOperation(5,0);
    expect(service.getOperator).toHaveBeenCalled();
    //expect(component.result).toBe(1);
    expect(component.errorInfo).toBe('Cannot divide by zero');

   }
   )   

   fit ('should validate http expection from  service Math operations', ()=> {   
    let operator_data: any[]=[] ;  
    operator_data = [{Operator: '+' }];
    const mockErrorResponse = { statusText: 'Bad Request' } as HttpErrorResponse
    //service.getOperator = jasmine.createSpy().and.returnValue(throwError(() => mockErrorResponse)) //Another way of doing
    spyOn(service, 'getOperator').and.returnValue(throwError(() => mockErrorResponse));
    component.fetchOperatorInfoFromService();
    expect(component.errorInfo).toBe("Invalid data"); 

   }
   ) 

   fit ('should save the outcome to DB', ()=> {   
    let operator_data: any[]=[] ;  
    operator_data = [{Operator: '+' }];
    spyOn(service, 'getOperator').and.returnValue(of(operator_data));
    spyOn(service, 'postToDB')
    component.arithmeticOperation(5,3);
    expect(service.getOperator).toHaveBeenCalled();
    expect(service.postToDB).toHaveBeenCalledWith(5, 3, "+", 8);
    expect(component.result).toBe(8);

   }
   ) 

 

  fit('should allow to order if there is sufficient stock', () => {
    //Arrange
    spyOn(service, 'getInventory').and.returnValue(7)
    //spyOn(service, 'updateInventory').withArgs("ABC", 2).and.callThrough()
    spyOn(service, 'updateInventory')
    //ACt
    component.orderItem("ABC", 5);
    //Assert    
    expect(service.updateInventory).toHaveBeenCalledWith("ABC", 2);
  })


  it('should allow not to order if there is no sufficient stock', () => {
    //Arrange
    spyOn(service, 'getInventory').and.returnValue(7)
    spyOn(service, 'updateInventory').withArgs("ABC", 2).and.callThrough()
    //ACt
    component.orderItem("ABC", 25);
    //Assert    
    expect(service.updateInventory).toHaveBeenCalledTimes(0)
    expect(component.errorInfo).toBe('Not Valid')
  })


  it ('it should calculate net price of an item on a weekday', () => {
    spyOn(service, 'getItemPrice').and.returnValue(500);
    spyOn(service, 'getDayOfTheWeek').and.returnValue(5)
    const today = new Date();
    component.calculateNetPrice("ABC")
    expect(component.itemPrice).toEqual(500);

  })

  it ('it should calculate net price of an item on a weekend', () => {
    spyOn(service, 'getItemPrice').and.returnValue(500);
    spyOn(service, 'getDayOfTheWeek').and.returnValue(6)
    component.calculateNetPrice("ABC")
    expect(component.itemPrice).toEqual(600);

  })

 


});


