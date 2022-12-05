import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CostSharedServiceService } from '../cost-shared-service.service';

import { EmployeetaxComponent } from './employeetax.component';

describe('EmployeetaxComponent', () => {
  let component: EmployeetaxComponent;
  let fixture: ComponentFixture<EmployeetaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ EmployeetaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeetaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
//    expect(component).toBeTruthy();
  });
});
