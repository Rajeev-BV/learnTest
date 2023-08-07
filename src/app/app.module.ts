import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { App1Component } from './app1/app1.component';
import { App2Component } from './app2/app2.component';
import { StudentComponent } from './student/student.component';
import { SensorComponent } from './sensor/sensor.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeetaxComponent } from './employeetax/employeetax.component';
import { AuthComponent } from './auth/auth.component';
import { PracticeComponent } from './practice/practice.component';
import { PrinttextComponent } from './printtext/printtext.component';

@NgModule({
  declarations: [
    AppComponent,
    App1Component,
    App2Component,
    StudentComponent,
    SensorComponent,
    SensorComponent,
    EmployeeComponent,
    EmployeetaxComponent,
    AuthComponent,
    PracticeComponent,
    PrinttextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
