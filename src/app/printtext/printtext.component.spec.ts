import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinttextComponent } from './printtext.component';

describe('PrinttextComponent', () => {
  let component: PrinttextComponent;
  let fixture: ComponentFixture<PrinttextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrinttextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinttextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
