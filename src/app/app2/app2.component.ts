import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-app2',
  templateUrl: './app2.component.html',
  styleUrls: ['./app2.component.less']
})
export class App2Component implements OnInit {
  message:string = "";
  
  constructor(private data:DataserviceService) { 
   
     }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  public onClick(): void {
    this.data.changeMessage("Hello from App2")
    console.debug("from comp 2" + this.message);
  }

 }
