import { Component, OnInit } from '@angular/core';
import { SensorService } from '../sensor.service';
import { CostSharedServiceService } from '../cost-shared-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.less']
})
export class SensorComponent implements OnInit {

  faultysensorList : any[]= [];
  sensorDataList: any[]=[];
  sensorDataRange: any[]=[];
  faultySensorListUI:any= [];
  cost:number=0;
  faultySensorCost:number=0;
  vendorID:string="";
  sensorState:string = "";
  sensorData : ISensorData[]= [];
  constructor(public sensorService: SensorService, private costSharedService : CostSharedServiceService) {
    this.costSharedService.currentCost.subscribe(sensorCost => this.faultySensorCost = sensorCost)
    //this.faultySensorCost = this.cost;
   }

  ngOnInit(): void {
    this.costSharedService.currentCost.subscribe(sensorCost => this.cost = sensorCost)
    //this.faultySensorCost = this.cost;
  }

  findFaultySensors() : any []{
     //In real world, get it from UI
    this.vendorID= "V1";
    this.sensorState = "Active";
    this.getSensorData();
    this.getSensorRange();
    console.log("Sensors" + this.sensorData[1].sensorId)
    console.log("Sensors" + this.sensorData[1].sensorValue)

   this.faultysensorList.push("S1");
   this.faultySensorListUI = this.faultysensorList;
   return this.faultysensorList;
  }

  getCostOfSensors():number{
    
    this.faultySensorCost = this.cost;
    console.log("Cost1" + this.faultySensorCost);
    return this.cost;
  }

  getSensorData(){
    this.sensorService.getSensorList(this.vendorID, this.sensorState).subscribe(
      (res) => {
        this.sensorData = res.data; 
        this.sensorDataList = res.data;
    })
  }

  getSensorRange(){
    this.sensorService.getSensorRange("S1").subscribe(
      (res) => {
        this.sensorDataRange = res;
    })
  }

}

export interface ISensorData{
  sensorId : number;
  sensorValue : number;
}
