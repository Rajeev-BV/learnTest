import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { App1Component } from './app1/app1.component';
import { App2Component } from './app2/app2.component';
import { StudentComponent } from './student/student.component';
import { SensorComponent } from './sensor/sensor.component';
import { CostComponent } from './cost/cost.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeetaxComponent } from './employeetax/employeetax.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    App1Component,
    App2Component,
    StudentComponent,
    SensorComponent,
    CostComponent,
    EmployeeComponent,
    EmployeetaxComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
