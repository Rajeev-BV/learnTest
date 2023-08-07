import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsService } from '../student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less']
})
export class StudentComponent implements OnInit {
  user_list :any[] = [];
  x:any;
  obs :any[] = [];
  result:string='';
  err_msg: string | undefined;
  gfg: string = '';
  constructor(public _userService: StudentsService) { }

  ngOnInit(): void {
    this._userService.getUserList().subscribe(
      (res) => {
        this.user_list = res.data;
      },
      (err) => {
        this.err_msg = 'Error while loading User List';        
      }
    );
    this.result= this.CompareList(this.user_list, 5);
   
  }

  FilterList() : void {
    this._userService.filterValueList().subscribe(
      (res) => {
        this.x = res.x;
      }
      
    )
    console.log("dcdcdc" + this.x.length)
  } 
  
  CompareList(res:any[], limit:number):string {
   
    this.obs = [...res];
    //your logic
    this.gfg = '3';
    console.log("ababa" + this.obs.length)
   return this.gfg;

    }
  }

 





