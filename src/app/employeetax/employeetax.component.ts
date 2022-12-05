import { Component, OnInit } from '@angular/core';
import { CostSharedServiceService } from '../cost-shared-service.service';
import { DBService } from '../db.service';

@Component({
  selector: 'app-employeetax',
  templateUrl: './employeetax.component.html',
  styleUrls: ['./employeetax.component.less']
})
export class EmployeetaxComponent implements OnInit {
  empTaxInfo:number=0;
  constructor(private costsharedservice:CostSharedServiceService) {
    this.costsharedservice.employeeIncomeTax.subscribe(
      tax => this.empTaxInfo = tax
    );
   }

  ngOnInit(): void {
    this.costsharedservice.employeeIncomeTax.subscribe(
      tax => this.empTaxInfo = tax
    );
  }

  getTax():number{
    return this.empTaxInfo;
  };

 }
