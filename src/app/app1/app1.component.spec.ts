import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App2Component } from '../app2/app2.component';
import { DataserviceService } from '../dataservice.service';

import { App1Component } from './app1.component';

describe('App1Component', () => {
  let component1: App1Component;
  let fixture1: ComponentFixture<App1Component>;

  let component2: App2Component;
  let fixture2: ComponentFixture<App2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        App1Component,
      App2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
  });

 

  it('should create app2', () => {
    fixture1 = TestBed.createComponent(App1Component);
    component1 = fixture1.componentInstance;
    fixture2 = TestBed.createComponent(App2Component);
    component2 = fixture2.componentInstance;
    const service = fixture2.debugElement.injector.get(DataserviceService);
    fixture2.detectChanges();
    const de = fixture2.debugElement;
    const button = de.query(By.css('[data-testid="btn"]'))
    fixture2.detectChanges();
    //service.messageSource.next("thris");
    button.triggerEventHandler('click', null);
    fixture2.detectChanges();
    expect(component2).toBeTruthy();
    console.debug("comp1" + component1.message)
    expect(component1.message).toBe("Hello from App2")
  });
  
});
