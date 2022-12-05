import { Component, OnInit } from '@angular/core';
import { CostService } from '../Sensorcost.service';
import { CostSharedServiceService } from '../cost-shared-service.service';

@Component({
  selector: 'app-cost',
  templateUrl: './Sensorcost.component.html',
  styleUrls: ['./Sensorcost.component.less']
})
export class CostComponent implements OnInit {
  cost:number=0;
  sensorCost:any=[];
  sensorCostFromService:number =0;

  constructor(public costService: CostService, private costSharedService : CostSharedServiceService) {
    this.costSharedService.currentCost.subscribe(sensorCost => this.cost = sensorCost)
   }

  ngOnInit() {
    this.costSharedService.currentCost.subscribe(sensorCost => this.cost = sensorCost)
  }

  calculateTotalCostOfFaultySensors() : number{
    this.costService.getFaultySensorCost().subscribe(
      (res) => {
        this.sensorCost.push(res.x);
       
    })
    this.sensorCostFromService = this.sensorCost[0] * 10;
    this.costSharedService.changeCost(this.sensorCostFromService);
    return this.sensorCostFromService;
  }

  getCostOfSensors() : void{
    this.costService.getFaultySensorCost().subscribe(
      (res) => {
        this.sensorCost = res.data;
    })
  }

}
