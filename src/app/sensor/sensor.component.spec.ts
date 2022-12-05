import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SensorService } from '../sensor.service';

import { SensorComponent } from './sensor.component';

export class sensorServiceStub {
  getSensorList() {
    return of({
      data: [
        { sensorId: 1, sensorValue: 15},
        { sensorId: 1, sensorValue: 40},
      ],
    });
  }
  getSensorRange(sensorID: string){
    {
      return of({
        data: [ { sensorId: 1, thresholdValue: 20},]
      
    });
  }
}
}
describe('SensorComponent', () => {
  let component: SensorComponent;
  let fixture: ComponentFixture<SensorComponent>;
  let faultysensorList : any[]= [];
  let faultysensorList1 : any[]= [];
  let expectedfaultysensorList: any[]= []; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SensorComponent ],
      providers: [{ provide: SensorService, useClass: sensorServiceStub }],
    })
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a service call to get list of sensors', () => {
    spyOn(component.sensorService, 'getSensorList').withArgs("V1", "Active").and.callThrough();
    faultysensorList= component.findFaultySensors();
    expect(component.sensorService.getSensorList).toHaveBeenCalled();
  });

  it('should make return faulty sensors', () => {
    expectedfaultysensorList.push("S1");
    fixture.detectChanges();
    faultysensorList= component.findFaultySensors();
    fixture.detectChanges();
    expect(faultysensorList).toEqual(expectedfaultysensorList);
  });

  it('should update the faulty sensor to DOM', fakeAsync( () => {
    fixture.detectChanges();
    faultysensorList1= component.findFaultySensors();
    let title = fixture.debugElement.query(By.css('p')).nativeElement; 
    title.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('p')).nativeElement.innerHTML).toEqual('S1');
   
  }));
});
