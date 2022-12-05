import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';


@Component({
  selector: 'app-app1',
  templateUrl: './app1.component.html',
  styleUrls: ['./app1.component.less']
})
export class App1Component implements OnInit {
  message:string = "";

  constructor(private data : DataserviceService) {
    this.data.currentMessage.subscribe(message => this.message=message)
   }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message=message)
  }

  onClick() : void
  {
    this.message;
    console.debug("from comp1" + this.message);
  }

  

}


