import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { CostService } from '../Sensorcost.service';
import { SensorComponent } from '../sensor/sensor.component';

import { CostComponent } from './Sensorcost.component';
import { SensorService } from '../sensor.service';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


export class sensorCostStub {
 getFaultySensorCost(){
    {
      return of({
         x: 2000
      
    });

  }
}
}


describe('CostComponent', () => {
  let component: CostComponent;
  let fixture: ComponentFixture<CostComponent>;
  let faultysensorCost:number = 0;
  let fixture1: ComponentFixture<SensorComponent>;
  let component1: SensorComponent;
  let cost:number=0;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ CostComponent, SensorComponent],
      //schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{ provide: CostService, useClass: sensorCostStub }],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Cost API', () => {
    spyOn(component.costService, 'getFaultySensorCost').and.callThrough();
    component.calculateTotalCostOfFaultySensors();
    expect(component.costService.getFaultySensorCost).toHaveBeenCalled();
  });

  it('should call calculate Cost of Sensors', () => {
    faultysensorCost = component.calculateTotalCostOfFaultySensors();
    fixture.detectChanges();
    expect(faultysensorCost).toEqual(20000);
  });

  it('should update the Cost in Sensor Comp via subscribe to DOM', fakeAsync( () => {
    faultysensorCost = component.calculateTotalCostOfFaultySensors();
    fixture1 = TestBed.createComponent(SensorComponent);
    fixture1.detectChanges();
    component1 = fixture1.componentInstance;
    fixture1.detectChanges();
    let title = fixture1.debugElement.query(By.css('h2')).nativeElement; 
    fixture1.detectChanges();
    title.dispatchEvent(new Event('input'));
    tick();
    fixture1.detectChanges();
    expect(fixture1.debugElement.query(By.css('h2')).nativeElement.textContent).toEqual('20000');
   
  }));



});
